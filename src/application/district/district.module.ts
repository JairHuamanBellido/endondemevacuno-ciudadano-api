import { Module, Provider } from '@nestjs/common';
import { DistrictDIToken } from '../../domain/districts/di/DistrictDIToken';
import { IDistrictRepository } from '../../domain/districts/interface/IDistrictRepository';
import { GetAllDistrictsService } from '../../domain/districts/service/GetAllDistrictsService';
import { DistrictRepository } from '../../infrastructure/repository/DistrictRepository';
import { DistrictController } from './controller/district.controller';
const persistenceProviders: Provider[] = [
  {
    provide: DistrictDIToken.IDistrictRepository,
    useFactory: () => new DistrictRepository(),
  },
];

const serviceProviders: Provider[] = [
  {
    provide: DistrictDIToken.GetAllDistrictsService,
    useFactory: (districtRepository: IDistrictRepository) =>
      new GetAllDistrictsService(districtRepository),
    inject: [DistrictDIToken.IDistrictRepository],
  },
];
@Module({
  providers: [...persistenceProviders, ...serviceProviders],
  controllers: [DistrictController],
})
export class DistrictModule {}
