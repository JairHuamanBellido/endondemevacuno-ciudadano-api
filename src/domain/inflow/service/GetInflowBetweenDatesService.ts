import { IInflowRepository } from '../interface/IInflowRepository';
import { Inflow } from '../model/Inflow';
import { Period } from '../types/Period';

export class GetInflowBetweenDatesService {
  constructor(private readonly inflowRepository: IInflowRepository) {}

  public async execute(
    startDate: string,
    endDate: string,
    vaccineCenterId: string,
    period: Period,
  ): Promise<any> {
    const data = await this.inflowRepository.getBetweenDates(
      startDate,
      endDate,
      vaccineCenterId,
    );

    if (period === 'hour') {
      const hour = new Date(startDate).getHours();
      return this.getInflowByHour(data, hour.toString());
    }
    return [];
  }

  private getInflowByHour(inflow: Inflow[], hour: string) {
    // It generates an array from 0 - 11
    const arr = Array.from({ length: 12 }, (_, index) => index);

    const addZeroToLeft = (value: string) => value.padStart(2, '0');

    // It generates an array with objects
    // {`hour:minute`: value} -> [{'20:15': 21} {'20:20': 12}]
    const generateTime = (_hour: string, index: number) => {
      const hour = addZeroToLeft(_hour);
      const minute = addZeroToLeft((index * 5).toString());
      return `${hour}:${minute}`;
    };

    return arr.map((v: number) => ({
      [`${generateTime(hour, v)}`]: inflow[v] ? inflow[v].peopleEntering : 0,
    }));
  }
}
