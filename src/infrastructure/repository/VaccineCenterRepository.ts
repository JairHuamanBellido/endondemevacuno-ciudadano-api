import { IVaccineCenterRepository } from 'src/domain/vaccineCenter/interface/IVaccineCenterRepository';
import { VaccineCenter } from 'src/domain/vaccineCenter/model/VaccineCenter';
import { dynamoDB } from '../database/DynamoDB';
import { VaccineCenterDynamoDB } from '../entity/VaccineCenterDynamoDB.entity';
import { VaccineCenterDynamoDBMapper } from '../mapper/VaccineCenterDynamoDBMapper';

export class VaccineCenterRepository implements IVaccineCenterRepository {
  private readonly vaccineCenterAlias = 'vaccine_center';

  public async getAll(): Promise<VaccineCenter[]> {
    const vaccinesCenter = await (
      await dynamoDB.scan({ TableName: this.vaccineCenterAlias }).promise()
    ).Items;

    const vaccinesCenterStringifly = JSON.stringify(vaccinesCenter);

    return VaccineCenterDynamoDBMapper.toDomainEntities(
      JSON.parse(vaccinesCenterStringifly) as VaccineCenterDynamoDB[],
    );
  }
}
