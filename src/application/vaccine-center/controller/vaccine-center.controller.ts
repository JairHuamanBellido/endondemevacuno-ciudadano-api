import { Controller, Get, Inject } from '@nestjs/common';
import { VaccineCenterDIToken } from 'src/domain/vaccineCenter/di/VaccineCenterDIToken';
import { VaccineCenter } from 'src/domain/vaccineCenter/model/VaccineCenter';
import { GetAllVaccineCenterService } from 'src/domain/vaccineCenter/service/GetAllVaccineCenterService';

@Controller('vaccine-center')
export class VaccineCenterController {
  constructor(
    @Inject(VaccineCenterDIToken.GetAllVaccineCenterService)
    private readonly getAllVacinceCentersService: GetAllVaccineCenterService,
  ) {}

  @Get('/')
  public async getAll(): Promise<VaccineCenter[]> {
    return await this.getAllVacinceCentersService.execute();
  }
}
