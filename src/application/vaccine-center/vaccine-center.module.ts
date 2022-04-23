import { Module, Provider } from '@nestjs/common';
import { InflowDIToken } from 'src/domain/inflow/di/InflowDIToken';
import { IInflowRepository } from 'src/domain/inflow/interface/IInflowRepository';
import { VaccineCenterDIToken } from 'src/domain/vaccineCenter/di/VaccineCenterDIToken';
import { GetAllVaccineCenterService } from 'src/domain/vaccineCenter/service/GetAllVaccineCenterService';
import { InflowDynamoDBRepository } from 'src/infrastructure/repository/InflowDynamoDBRepository';
import { VaccineCenterRepository } from 'src/infrastructure/repository/VaccineCenterRepository';
import { VaccineCenterController } from './controller/vaccine-center.controller';

const persistenceProviders: Provider[] = [
  {
    provide: VaccineCenterDIToken.IVaccineCenterRepository,
    useFactory: () => new VaccineCenterRepository(),
  },
  {
    provide: InflowDIToken.IInflowRepository,
    useFactory: () => new InflowDynamoDBRepository(),
  },
];

const serviceProviders: Provider[] = [
  {
    provide: VaccineCenterDIToken.GetAllVaccineCenterService,
    useFactory: (
      vaccineCenterRepository: VaccineCenterRepository,
      inflowRepository: IInflowRepository,
    ) =>
      new GetAllVaccineCenterService(vaccineCenterRepository, inflowRepository),
    inject: [
      VaccineCenterDIToken.IVaccineCenterRepository,
      InflowDIToken.IInflowRepository,
    ],
  },
];

@Module({
  providers: [...persistenceProviders, ...serviceProviders],
  controllers: [VaccineCenterController],
})
export class VaccineCenterModule {}
