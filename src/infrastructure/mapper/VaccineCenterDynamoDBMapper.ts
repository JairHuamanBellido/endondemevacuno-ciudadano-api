import { VaccineCenter } from 'src/domain/vaccineCenter/model/VaccineCenter';
import { VaccineCenterDynamoDB } from '../entity/VaccineCenterDynamoDB.entity';

export class VaccineCenterDynamoDBMapper {
  public static toDomainEntity(
    vaccineCenterDynamoDB: VaccineCenterDynamoDB,
  ): VaccineCenter {
    return {
      businessHour: vaccineCenterDynamoDB.business_hour.S,
      direction: vaccineCenterDynamoDB.direction.S,
      diris: vaccineCenterDynamoDB.diris.S,
      distrito: vaccineCenterDynamoDB.distrito.S,
      id: vaccineCenterDynamoDB.id.S,
      localization: vaccineCenterDynamoDB.localization.S,
      name: vaccineCenterDynamoDB.name.S,
      vaccines: vaccineCenterDynamoDB.vaccines.L.map((e) => e.S),
    };
  }

  public static toDomainEntities(
    vaccineCenterDynamoDB: VaccineCenterDynamoDB[],
  ): VaccineCenter[] {
    return vaccineCenterDynamoDB.map((e) => this.toDomainEntity(e));
  }
}
