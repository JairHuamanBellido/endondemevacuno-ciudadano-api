import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistrictModule } from './application/district/district.module';
import { VaccineModule } from './application/vaccine/vaccine.module';
import { VaccineCenterModule } from './application/vaccine-center/vaccine-center.module';
import { InflowModule } from './application/inflow/inflow.module';

@Module({
  imports: [DistrictModule, VaccineModule, VaccineCenterModule, InflowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
