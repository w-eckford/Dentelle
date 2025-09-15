import { Body, Controller, Post } from '@nestjs/common';
import { PlansService } from './plans.service.js';

@Controller('employer')
export class PlansController {
  constructor(private readonly svc: PlansService) {}

  @Post('create')
  createEmployer(@Body() body: { name: string; domains: string[] }) {
    return this.svc.createEmployer(body.name, body.domains);
  }

  @Post('plan')
  createPlan(
    @Body()
    body: {
      employerId: string;
      discountBp: number;
      lookback: boolean;
      pctCap: number;
      annualCapUsd: number;
      holdingPolicy?: string | null;
    },
  ) {
    return this.svc.createPlan(body);
  }

  @Post('offering')
  createOffering(
    @Body() body: { planId: string; grantFmvUsd: number; startAt: string; purchaseAt: string },
  ) {
    return this.svc.createOffering(body.planId, {
      grantFmvUsd: body.grantFmvUsd,
      startAt: new Date(body.startAt),
      purchaseAt: new Date(body.purchaseAt),
    });
  }
}

