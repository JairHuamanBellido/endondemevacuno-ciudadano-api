import { IVaccineCenterRepository } from '../interface/IVaccineCenterRepository';
import { VaccineCenter } from '../model/VaccineCenter';
import { IInflowRepository } from '../../inflow/interface/IInflowRepository';
import { Inflow } from 'src/domain/inflow/model/Inflow';

enum AffluenceLevel {
  'low' = 0.3,
  'medium' = 0.7,
}
export class GetAllVaccineCenterService {
  constructor(
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
    private readonly inflowRepository: IInflowRepository,
  ) {}

  public async execute(): Promise<VaccineCenter[]> {
    const vaccinesCenter = await this.vaccineCenterRepository.getAll();
    const { endDate, startDate } = this.getDatesDayCurrentDay();

    for await (const iterator of vaccinesCenter) {
      const { id, capacity } = iterator;
      const inflows = await this.inflowRepository.getBetweenDates(
        startDate,
        endDate,
        id,
      );
      const affluenceLevel =
        inflows[0] !== undefined
          ? this.getAffluenceLevel(capacity, inflows[0])
          : 'Sin data';

      iterator.affluenceLevel = affluenceLevel;
    }
    return vaccinesCenter;
  }

  private standardizeTimeToPeru(date: Date) {
    date.setHours(date.getHours() - 5);
  }

  private getAffluenceLevel(capacity: number, inflow: Inflow): string {
    const result = inflow.peopleEntering / capacity;
    if (result <= AffluenceLevel.low) {
      return 'Baja';
    } else if (result > AffluenceLevel.low && result < AffluenceLevel.medium) {
      return 'Media';
    } else if (result >= AffluenceLevel.medium) {
      return 'Alta';
    }
  }
  private getDatesDayCurrentDay() {
    let startDate = '';
    let endDate = '';
    const currentDate = new Date();

    currentDate.setHours(0);
    currentDate.setMinutes(0);
    this.standardizeTimeToPeru(currentDate);

    startDate = currentDate.toISOString();

    currentDate.setUTCHours(23);
    currentDate.setUTCMinutes(59);

    endDate = currentDate.toISOString();

    return { startDate, endDate };
  }
}
