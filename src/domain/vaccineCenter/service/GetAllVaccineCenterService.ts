import { IVaccineCenterRepository } from '../interface/IVaccineCenterRepository';
import { VaccineCenter } from '../model/VaccineCenter';

export class GetAllVaccineCenterService {
  constructor(
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
  ) {}

  public async execute(): Promise<VaccineCenter[]> {
    return await this.vaccineCenterRepository.getAll();
  }
}
