import { Controller, Get, Inject } from '@nestjs/common';
import { VaccineDIToken } from 'src/domain/vaccine/di/VaccineDIToken';
import { VaccinesByDisease } from 'src/domain/vaccine/model/VaccinesByDisease';
import { GetAllVaccinesService } from 'src/domain/vaccine/service/GetAllVaccinesService';

@Controller('vaccines')
export class VaccineController {
  constructor(
    @Inject(VaccineDIToken.GetAllVaccinesService)
    private readonly getAllVacinesService: GetAllVaccinesService,
  ) {}

  @Get('/')
  public async getAll(): Promise<VaccinesByDisease[]> {
    return await this.getAllVacinesService.execute();
  }
}
