import { Module, Provider } from '@nestjs/common';
import { VaccineDIToken } from 'src/domain/vaccine/di/VaccineDIToken';
import { IVaccineRepository } from 'src/domain/vaccine/interface/IVaccineRepository';
import { GetAllVaccinesService } from 'src/domain/vaccine/service/GetAllVaccinesService';
import { VaccineRepository } from 'src/infrastructure/repository/VaccineRepository';
import { VaccineController } from './controller/vaccine.controller';

const persistenceProviders: Provider[] = [
  {
    provide: VaccineDIToken.IVaccineRepository,
    useFactory: () => new VaccineRepository(),
  },
];

const serviceProviders: Provider[] = [
  {
    provide: VaccineDIToken.GetAllVaccinesService,
    useFactory: (vaccineRepository: IVaccineRepository) =>
      new GetAllVaccinesService(vaccineRepository),
    inject: [VaccineDIToken.IVaccineRepository],
  },
];
@Module({
  providers: [...persistenceProviders, ...serviceProviders],
  controllers: [VaccineController],
})
export class VaccineModule {}
