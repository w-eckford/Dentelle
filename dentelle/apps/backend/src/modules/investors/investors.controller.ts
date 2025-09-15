import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvestorsService } from './investors.service.js';

@Controller('investors')
export class InvestorsController {
  constructor(private readonly svc: InvestorsService) {}

  @Get('programs')
  list() {
    return this.svc.listPrograms();
  }

  @Post('commit')
  commit(@Body() body: { investorId: string; programId: string; amount: number }) {
    return this.svc.commit(body.investorId, body.programId, body.amount);
  }
}

