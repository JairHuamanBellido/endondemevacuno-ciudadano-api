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
      return this.getInflowByHour(inflows, startDate, endDate);
    } else if (period === 'day') {
      return this.getInflowByDay(inflows);
    } else if (period === 'week') {
      return this.getInflowPerWeek(inflows);
    }

    return this.getInflowPerMonth(inflows, startDate);
  }

  private getInflowByHour(
    inflow: Inflow[],
    startDate: string,
    endDate: string,
  ) {
    // It generates an array from 0 - 11
    const arr = Array.from({ length: 12 }, (_, index) => index);

    const roundToNearest5 = (x) => Math.round(x / 5) * 5;

    const startHour = new Date(startDate).getHours();
    const endHour = new Date(endDate).getHours();
    const startMinute = roundToNearest5(new Date(startDate).getMinutes());
    const lastMinute = roundToNearest5(new Date(endDate).getMinutes()) - 5;

    const groupInflowByMinutes = this.groupInflowByPeriod(inflow, 'hour');
    let currentHour = startHour;
    const inflowPerMinute: InflowByTime[] = [];

    arr.forEach((e) => {
      const minute = this.getAutocompleteMinutes(startMinute, e);
      if (minute === 0 && lastMinute >= 0) {
        currentHour = endHour;
      }
      const hourParsed = this.addZeroToLeft(currentHour.toString());
      const minuteParsed = this.addZeroToLeft(minute.toString());
      const time = `${hourParsed}:${minuteParsed}`;
      if (groupInflowByMinutes[time] === undefined) {
        inflowPerMinute.push({ [time]: 0 });
      } else {
        const average = this.getAverageInflows(groupInflowByMinutes[time]);
        inflowPerMinute.push({ [time]: average });
      }
    });

    return inflowPerMinute;
  }

  private getAutocompleteMinutes(startMinute: number, index: number) {
    const minute = (startMinute + 5 * index) % 60;

    return minute;
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
  private addZeroToLeft = (value: string) => value.padStart(2, '0');

  private groupInflowByPeriod(inflow: Inflow[], period: Period) {
    const inflowByPeriod: { [key: string]: Inflow[] } = {};

    inflow.forEach((e) => {
      let timePeriod;
      if (period === 'hour') {
        timePeriod = `${new Date(
          e.createdAt,
        ).getUTCHours()}:${this.addZeroToLeft(
          new Date(e.createdAt).getMinutes().toString(),
        )}`;
      } else if (period === 'day') {
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
}
