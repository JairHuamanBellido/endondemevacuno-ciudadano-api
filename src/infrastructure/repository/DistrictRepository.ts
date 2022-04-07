import { IDistrictRepository } from 'src/domain/districts/interface/IDistrictRepository';
import { dynamoDB } from '../database/DynamoDB';
import { DistrictDynamoDB } from '../entity/DistrictDynamoDB.entity';
import { DistrictDynamoDBMapper } from '../mapper/DistrictDynamoDBMapper';

export class DistrictRepository implements IDistrictRepository {
  private readonly districtAlias = 'endondemevacuno-districts';

  public async getAll() {
    const districts = await (
      await dynamoDB
        .scan({
          TableName: this.districtAlias,
        })
        .promise()
    ).Items;

    const districtsStringifly = JSON.stringify(districts);

    return DistrictDynamoDBMapper.toDomainEntities(
      JSON.parse(districtsStringifly) as DistrictDynamoDB[],
    );
  }
}
