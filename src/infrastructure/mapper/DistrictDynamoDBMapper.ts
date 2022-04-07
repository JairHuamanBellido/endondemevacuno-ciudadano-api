import { District } from 'src/domain/districts/model/District';
import { DistrictDynamoDB } from '../entity/DistrictDynamoDB.entity';

export class DistrictDynamoDBMapper {
  public static toDomainEntity(districtDynamodb: DistrictDynamoDB): District {
    return {
      id: districtDynamodb.id.S,
      name: districtDynamodb.name.S,
    };
  }

  public static toDomainEntities(
    districtsDynamoDB: DistrictDynamoDB[],
  ): District[] {
    return districtsDynamoDB.map((e) => this.toDomainEntity(e));
  }
}
