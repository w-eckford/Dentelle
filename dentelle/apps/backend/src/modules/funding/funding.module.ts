import { Module } from '@nestjs/common';
import { FundingService } from './funding.service.js';

@Module({
  providers: [FundingService],
  exports: [FundingService],
})
export class FundingModule {}

