import { Inflow } from '../model/Inflow';

export interface IInflowRepository {
  getBetweenDates(
    startDate: string,
    endDate: string,
    vaccineCenterId: string,
  ): Promise<Inflow[]>;

  getLastInflow(vaccineCenterId: string): Promise<Inflow>;
}
