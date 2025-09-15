import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':employeeId/:offeringId')
  get(@Param('employeeId') employeeId: string, @Param('offeringId') offeringId: string) {
    return this.prisma.enrollment.findFirst({ where: { employeeId, offeringId } });
  }

  @Post('set')
  async set(
    @Body() body: { employeeId: string; offeringId: string; contribPct: number; assistOn: boolean },
  ) {
    if (body.contribPct < 0 || body.contribPct > 100) throw new Error('invalid pct');
    const existing = await this.prisma.enrollment.findFirst({
      where: { employeeId: body.employeeId, offeringId: body.offeringId },
    });
    if (existing) {
      return this.prisma.enrollment.update({
        where: { id: existing.id },
        data: { contribPct: body.contribPct, assistOn: body.assistOn },
      });
    }
    return this.prisma.enrollment.create({ data: body });
  }
}
