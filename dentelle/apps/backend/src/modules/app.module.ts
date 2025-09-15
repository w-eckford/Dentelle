import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PlansModule } from './plans/plans.module.js';
import { RosterModule } from './roster/roster.module.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';
import { FundingModule } from './funding/funding.module.js';
import { BrokerModule } from './broker/broker.module.js';
import { PurchaseModule } from './purchase/purchase.module.js';
import { InvestorsModule } from './investors/investors.module.js';
import { ContractsModule } from './contracts/contracts.module.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PlansModule,
    RosterModule,
    EnrollmentModule,
    FundingModule,
    BrokerModule,
    PurchaseModule,
    InvestorsModule,
    ContractsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
