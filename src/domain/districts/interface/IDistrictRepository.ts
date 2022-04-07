import { District } from '../model/District';

export interface IDistrictRepository {
  getAll(): Promise<District[]>;
}
