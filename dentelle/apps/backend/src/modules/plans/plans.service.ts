import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  createEmployer(name: string, domains: string[]) {
    return this.prisma.employer.create({ data: { name, domains } });
  }

  createPlan(input: {
    employerId: string;
    discountBp: number;
    lookback: boolean;
    pctCap: number;
    annualCapUsd: number;
    holdingPolicy?: string | null;
  }) {
    return this.prisma.plan.create({ data: input });
  }

  createOffering(planId: string, input: { grantFmvUsd: number; startAt: Date; purchaseAt: Date }) {
    return this.prisma.offering.create({
      data: { planId, grantFmvUsd: input.grantFmvUsd, startAt: input.startAt, purchaseAt: input.purchaseAt, status: 'DRAFT' },
    });
  }
}

