import { IInflowRepository } from '../interface/IInflowRepository';
import { Inflow } from '../model/Inflow';
import { InflowByTime } from '../types/InflowByTime';
import { Period } from '../types/Period';

const Days = {
  '1': 'Lun',
  '2': 'Mar',
  '3': 'Mie',
  '4': 'Jue',
  '5': 'Vie',
  '6': 'Sab',
  '0': 'Dom',
};
export class GetInflowBetweenDatesService {
  constructor(private readonly inflowRepository: IInflowRepository) {}

  public async execute(
    startDate: string,
    endDate: string,
    vaccineCenterId: string,
    period: Period,
  ): Promise<any> {
    const inflows = await this.inflowRepository.getBetweenDates(
      startDate,
      endDate,
      vaccineCenterId,
    );

    if (period === 'hour') {
      const hour = new Date(startDate).getUTCHours();
      return this.getInflowByHour(inflows, hour.toString());
    } else if (period === 'day') {
      return this.getInflowByDay(inflows);
    } else if (period === 'week') {
      return this.getInflowPerWeek(inflows);
    }

    return this.getInflowPerMonth(inflows, startDate);
  }

  private getInflowByHour(inflow: Inflow[], hour: string) {
    // It generates an array from 0 - 11
    const arr = Array.from({ length: 12 }, (_, index) => index);

    // It generates an array with objects
    // {`hour:minute`: value} -> [{'20:15': 21} {'20:20': 12}]
    const generateTime = (_hour: string, index: number) => {
      const hour = this.addZeroToLeft(_hour);
      const minute = this.addZeroToLeft((index * 5).toString());
      return `${hour}:${minute}`;
    };

    return arr.map((v: number) => ({
      [`${generateTime(hour, v)}`]: inflow[v] ? inflow[v].peopleEntering : 0,
    }));
  }

  private getInflowByDay(inflow: Inflow[]) {
    const groupInflowByHour = this.groupInflowByPeriod(inflow, 'day');

    const inflowPerHour: InflowByTime[] = [];
    Object.keys(groupInflowByHour).forEach((hour) => {
      const hourParsed = this.addZeroToLeft(hour);
      const average = this.getAverageInflows(groupInflowByHour[hour]);
      inflowPerHour.push({ [`${hourParsed}`]: average });
    });
    return inflowPerHour;
  }

  private getInflowPerWeek(inflow: Inflow[]) {
    const arr = Array.from({ length: 6 }, (_, index) => index + 1);

    const groupInflowPerWeek = this.groupInflowByPeriod(inflow, 'week');

    const inflowPerDay: InflowByTime[] = [];

    // Object.keys(groupInflowPerWeek).forEach((day) => {
    //   const dayParsed = Days[day];
    //   const average = this.getAverageInflows(groupInflowPerWeek[day]);
    //   inflowPerDay.push({ [`${dayParsed}`]: average });
    // });

    /**Autocomplete days with 0 value */
    arr.forEach((numberDay) => {
      const dayParsed = Days[numberDay];
      if (groupInflowPerWeek[numberDay] === undefined) {
        inflowPerDay.push({ [dayParsed]: 0 });
      } else {
        const average = this.getAverageInflows(groupInflowPerWeek[numberDay]);
        inflowPerDay.push({ [dayParsed]: average });
      }
    });

    // Complete sunday , because its equal 0
    if (groupInflowPerWeek['0'] === undefined) {
      inflowPerDay.push({ Dom: 0 });
    } else {
      const average = this.getAverageInflows(groupInflowPerWeek['0']);
      inflowPerDay.push({ Dom: average });
    }

    return inflowPerDay;
  }

  private getInflowPerMonth(inflow: Inflow[], startDate: string) {
    const date = new Date(startDate);
    const totalDaysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const arr = Array.from(
      { length: totalDaysInMonth },
      (_, index) => index + 1,
    );

    const groupInflowByMonth = this.groupInflowByPeriod(inflow, 'month');

    const inflowPerDate: InflowByTime[] = [];

    arr.forEach((date) => {
      if (groupInflowByMonth[date] === undefined) {
        inflowPerDate.push({ [date]: 0 });
      } else {
        const average = this.getAverageInflows(groupInflowByMonth[date]);
        inflowPerDate.push({ [date]: average });
      }
    });
    return inflowPerDate;
  }

  private getAverageInflows(inflows: Inflow[]): number {
    let average = 0;

    inflows.forEach((e) => {
      average = average + e.peopleEntering;
    });

    return Math.round(average / inflows.length);
  }

  private groupInflowByPeriod(inflow: Inflow[], period: Period) {
    const inflowByPeriod: { [key: string]: Inflow[] } = {};

    inflow.forEach((e) => {
      let timePeriod;
      if (period === 'day') {
        timePeriod = new Date(e.createdAt).getUTCHours();
      } else if (period === 'week') {
        timePeriod = new Date(e.createdAt).getUTCDay();
      } else if (period === 'month') {
        timePeriod = new Date(e.createdAt).getUTCDate();
      }

      if (inflowByPeriod[timePeriod] === undefined) {
        inflowByPeriod[timePeriod] = [e];
      } else {
        inflowByPeriod[timePeriod].push(e);
      }
    });

    return inflowByPeriod;
  }

  private addZeroToLeft = (value: string) => value.padStart(2, '0');
}
