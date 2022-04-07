import { VaccineCenter } from '../model/VaccineCenter';

export interface IVaccineCenterRepository {
  getAll(): Promise<VaccineCenter[]>;
}
