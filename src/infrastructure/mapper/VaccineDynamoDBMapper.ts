import { Vaccine } from 'src/domain/vaccine/model/Vaccine';
import { VaccineDynamoDB } from '../entity/VaccineDynamoDB.entity';

export class VaccineDynamoDBMapper {
  public static toDomainEntity(vaccineDynamoDB: VaccineDynamoDB): Vaccine {
    return {
      disease: vaccineDynamoDB.disease.S,
      name: vaccineDynamoDB.name.S,
    };
  }

  public static toDomainEntities(
    vaccinesDynamoDB: VaccineDynamoDB[],
  ): Vaccine[] {
    return vaccinesDynamoDB.map((e) => this.toDomainEntity(e));
  }
}
