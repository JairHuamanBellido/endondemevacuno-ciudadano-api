import { Module, Provider } from '@nestjs/common';
import { VaccineCenterDIToken } from 'src/domain/vaccineCenter/di/VaccineCenterDIToken';
import { GetAllVaccineCenterService } from 'src/domain/vaccineCenter/service/GetAllVaccineCenterService';
import { VaccineCenterRepository } from 'src/infrastructure/repository/VaccineCenterRepository';
import { VaccineCenterController } from './controller/vaccine-center.controller';

const persistenceProviders: Provider[] = [
  {
    provide: VaccineCenterDIToken.IVaccineCenterRepository,
    useFactory: () => new VaccineCenterRepository(),
  },
];

const serviceProviders: Provider[] = [
  {
    provide: VaccineCenterDIToken.GetAllVaccineCenterService,
    useFactory: (vaccineCenterRepository: VaccineCenterRepository) =>
      new GetAllVaccineCenterService(vaccineCenterRepository),
    inject: [VaccineCenterDIToken.IVaccineCenterRepository],
  },
];

@Module({
  providers: [...persistenceProviders, ...serviceProviders],
  controllers: [VaccineCenterController],
})
export class VaccineCenterModule {}
