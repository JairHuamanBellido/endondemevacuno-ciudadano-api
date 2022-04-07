import { Vaccine } from 'src/domain/vaccine/model/Vaccine';
import { IVaccineRepository } from '../../domain/vaccine/interface/IVaccineRepository';
import { dynamoDB } from '../database/DynamoDB';
import { VaccineDynamoDB } from '../entity/VaccineDynamoDB.entity';
import { VaccineDynamoDBMapper } from '../mapper/VaccineDynamoDBMapper';

export class VaccineRepository implements IVaccineRepository {
  private readonly vaccineAlias = 'endondemevacuno-vaccines';

  public async getAll(): Promise<Vaccine[]> {
    const vaccines = await (
      await dynamoDB
        .scan({
          TableName: this.vaccineAlias,
        })
        .promise()
    ).Items;

    const vaccineStringifly = JSON.stringify(vaccines);

    return VaccineDynamoDBMapper.toDomainEntities(
      JSON.parse(vaccineStringifly) as VaccineDynamoDB[],
    );
  }
}
