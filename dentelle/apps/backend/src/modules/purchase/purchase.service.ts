import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { FundingService } from '../funding/funding.service.js';
import { BrokerService } from '../broker/broker.service.js';
import { ContractsService } from '../contracts/contracts.service.js';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly funding: FundingService,
    private readonly broker: BrokerService,
    private readonly contracts: ContractsService,
  ) {}

  // Per-pay cycle: compute top-ups and call recordContribution (stub computation)
  async runPerPay(offeringId: string) {
    const enrollments = await this.prisma.enrollment.findMany({ where: { offeringId } });
    for (const enr of enrollments) {
      const amount = Math.round(enr.contribPct * 10); // placeholder
      await this.funding.advance(enr.employeeId, 'cycle_1', amount);
      await this.contracts.recordContribution('0x0000000000000000000000000000000000000001', amount);
      await this.prisma.advance.create({
        data: { employeeId: enr.employeeId, payrollCycleId: 'cycle_1', amount, status: 'ADVANCED' },
      });
    }
    return { ok: true, count: enrollments.length };
  }

  // Purchase-day: generate instruction, simulate broker, anchor hash (stub)
  async runPurchaseDay(offeringId: string) {
    const instr = await this.broker.generateInstruction(offeringId);
    const fills = await this.broker.executeInstruction(instr.fileUri);
    const merkleRoot = '0x' + '00'.repeat(32); // placeholder
    await this.contracts.anchorDistribution(Number(offeringId), merkleRoot, instr.fileUri);
    return { ok: true, anchored: { merkleRoot, uri: instr.fileUri }, fills };
  }
}

