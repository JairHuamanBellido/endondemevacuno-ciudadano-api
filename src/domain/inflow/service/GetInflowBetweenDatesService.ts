import { IInflowRepository } from '../interface/IInflowRepository';
import { Inflow } from '../model/Inflow';

export class GetInflowBetweenDatesService {
  constructor(private readonly inflowRepository: IInflowRepository) {}

  public async execute(
    startDate: string,
    endDate: string,
    vaccineCenterId: string,
  ): Promise<Inflow[]> {
    return await this.inflowRepository.getBetweenDates(
      startDate,
      endDate,
      vaccineCenterId,
    );
  }
}
