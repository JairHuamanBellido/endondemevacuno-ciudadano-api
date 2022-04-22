import { IVaccineRepository } from '../interface/IVaccineRepository';
import { VaccinesByDisease } from '../model/VaccinesByDisease';
export class GetAllVaccinesService {
  constructor(private readonly vaccineRepository: IVaccineRepository) {}

  public async execute() {
    const vaccines = await this.vaccineRepository.getAll();

    const diseases = [...new Set(vaccines.map((e) => e.disease))];

    const vaccinesByDisease: VaccinesByDisease[] = [];

    diseases.forEach((e) => {
      vaccinesByDisease.push({
        disease: e,
        vaccines: [
          ...vaccines
            .filter((vaccine) => vaccine.disease === e)
            .map((q) => q.name),
        ],
      });
    });

    return vaccinesByDisease;
  }
}
