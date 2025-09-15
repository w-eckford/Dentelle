import { Module } from '@nestjs/common';
import { InvestorsController } from './investors.controller.js';
import { InvestorsService } from './investors.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [InvestorsController],
  providers: [InvestorsService],
})
export class InvestorsModule {}

