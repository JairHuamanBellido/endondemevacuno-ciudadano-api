import { Vaccine } from '../model/Vaccine';

export interface IVaccineRepository {
  getAll(): Promise<Vaccine[]>;
}
