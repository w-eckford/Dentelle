import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller.js';
import { PurchaseService } from './purchase.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { FundingModule } from '../funding/funding.module.js';
import { BrokerModule } from '../broker/broker.module.js';
import { ContractsModule } from '../contracts/contracts.module.js';

@Module({
  imports: [PrismaModule, FundingModule, BrokerModule, ContractsModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}

