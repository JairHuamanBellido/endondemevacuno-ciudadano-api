import { Module, Provider } from '@nestjs/common';
import { InflowController } from './controller/inflow.controller';
import { InflowDIToken } from '../../domain/inflow/di/InflowDIToken';
import { InflowDynamoDBRepository } from '../../infrastructure/repository/InflowDynamoDBRepository';
import { GetInflowBetweenDatesService } from '../../domain/inflow/service/GetInflowBetweenDatesService';
const persistenceProviders: Provider[] = [
  {
    provide: InflowDIToken.IInflowRepository,
    useFactory: () => new InflowDynamoDBRepository(),
  },
];

const serviceProviders: Provider[] = [
  {
    provide: InflowDIToken.GetInflowBetweenDatesService,
    useFactory: (inflowRepository: InflowDynamoDBRepository) =>
      new GetInflowBetweenDatesService(inflowRepository),
    inject: [InflowDIToken.IInflowRepository],
  },
];
@Module({
  providers: [...serviceProviders, ...persistenceProviders],
  controllers: [InflowController],
})
export class InflowModule {}
