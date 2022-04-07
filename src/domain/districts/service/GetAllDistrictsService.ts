import { IDistrictRepository } from '../interface/IDistrictRepository';
import { District } from '../model/District';

export class GetAllDistrictsService {
  constructor(private readonly districtRepository: IDistrictRepository) {}

  public async execute(): Promise<District[]> {
    return await this.districtRepository.getAll();
  }
}
