import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('roster')
export class RosterController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('upload')
  async upload(
    @Body()
    body: {
      employerId: string;
      rows: { employeeId: string; workEmail: string; paySchedule: string; basePay: number; eligibility: boolean }[];
    },
  ) {
    for (const r of body.rows) {
      await this.prisma.employee.upsert({
        where: { email: r.workEmail },
        update: { basePay: r.basePay, paySchedule: r.paySchedule, eligible: r.eligibility },
        create: {
          employerId: body.employerId,
          extEmployeeId: r.employeeId,
          email: r.workEmail,
          basePay: r.basePay,
          paySchedule: r.paySchedule,
          eligible: r.eligibility,
        },
      });
    }
    return { ok: true, count: body.rows.length };
  }
}

