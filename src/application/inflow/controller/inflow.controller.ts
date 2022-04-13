import { Controller, Get, Inject, Query } from '@nestjs/common';
import { InflowDIToken } from 'src/domain/inflow/di/InflowDIToken';
import { Inflow } from 'src/domain/inflow/model/Inflow';
import { GetInflowBetweenDatesService } from 'src/domain/inflow/service/GetInflowBetweenDatesService';
import { Period } from 'src/domain/inflow/types/Period';

@Controller('inflow')
export class InflowController {
  constructor(
    @Inject(InflowDIToken.GetInflowBetweenDatesService)
    private readonly getInflowBetweenDatesService: GetInflowBetweenDatesService,
  ) {}

  @Get('')
  public async getBetweenDates(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('vaccineCenterId') vaccineCenterId: string,
    @Query('period') period: Period,
  ): Promise<Inflow[]> {
    return await this.getInflowBetweenDatesService.execute(
      startDate,
      endDate,
      vaccineCenterId,
      period,
    );
  }
}
