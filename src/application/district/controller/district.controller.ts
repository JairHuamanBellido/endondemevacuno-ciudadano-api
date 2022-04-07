import { Controller, Get, Inject } from '@nestjs/common';
import { DistrictDIToken } from 'src/domain/districts/di/DistrictDIToken';
import { District } from 'src/domain/districts/model/District';
import { GetAllDistrictsService } from 'src/domain/districts/service/GetAllDistrictsService';

@Controller('districts')
export class DistrictController {
  constructor(
    @Inject(DistrictDIToken.GetAllDistrictsService)
    private readonly getAllDistrictsService: GetAllDistrictsService,
  ) {}

  @Get('/')
  public async getAll(): Promise<District[]> {
    return await this.getAllDistrictsService.execute();
  }
}
