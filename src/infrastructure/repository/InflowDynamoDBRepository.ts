import { IInflowRepository } from 'src/domain/inflow/interface/IInflowRepository';
import { Inflow } from 'src/domain/inflow/model/Inflow';
import { dynamoDB } from '../database/DynamoDB';
import { InflowDynamoDB } from '../entity/InflowDynamoDB.entity';
import { InflowDynamoDBMapper } from '../mapper/InflowDynamoDBMapper';

export class InflowDynamoDBRepository implements IInflowRepository {
  private readonly inflowTableAlias = 'inflow';

  public async getBetweenDates(
    startDate: string,
    endDate: string,
    vaccineCenterId: string,
  ): Promise<Inflow[]> {
    const inflowsDynamoDB = await (
      await dynamoDB
        .scan({
          TableName: this.inflowTableAlias,
          ScanFilter: {
            created_at: {
              ComparisonOperator: 'BETWEEN',
              AttributeValueList: [{ S: startDate }, { S: endDate }],
            },
            vaccine_center_id: {
              ComparisonOperator: 'EQ',
              AttributeValueList: [{ S: vaccineCenterId }],
            },
            is_closed: {
              ComparisonOperator: 'EQ',
              AttributeValueList: [{ BOOL: true }],
            },
          },
        })
        .promise()
    ).Items;
    const inflowStringfly = JSON.stringify(inflowsDynamoDB);

    return InflowDynamoDBMapper.toDomainsEntities(
      JSON.parse(inflowStringfly) as InflowDynamoDB[],
    ).sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
  }

  public async getLastInflow(vaccineCenterId: string): Promise<Inflow> {
    const inflowsDynamoDB = await (
      await dynamoDB
        .scan({
          TableName: this.inflowTableAlias,
          ScanFilter: {
            vaccine_center_id: {
              ComparisonOperator: 'EQ',
              AttributeValueList: [{ S: vaccineCenterId }],
            },
            is_closed: {
              ComparisonOperator: 'EQ',
              AttributeValueList: [{ BOOL: true }],
            },
          },
        })
        .promise()
    ).Items;
    const inflowStringfly = JSON.stringify(inflowsDynamoDB);

    return InflowDynamoDBMapper.toDomainsEntities(
      JSON.parse(inflowStringfly) as InflowDynamoDB[],
    ).sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))[0];
  }
}
