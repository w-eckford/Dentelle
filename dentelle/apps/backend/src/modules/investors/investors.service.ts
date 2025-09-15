import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {}

  listPrograms() {
    return this.prisma.offering.findMany({ include: { plan: { include: { employer: true } } } });
  }

  async commit(investorId: string, programId: string, amount: number) {
    return this.prisma.commitment.create({ data: { investorId, programId, amount, status: 'COMMITTED' } });
  }
}

