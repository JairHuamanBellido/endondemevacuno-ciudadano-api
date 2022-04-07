import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistrictModule } from './application/district/district.module';
import { VaccineModule } from './application/vaccine/vaccine.module';

@Module({
  imports: [DistrictModule, VaccineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
