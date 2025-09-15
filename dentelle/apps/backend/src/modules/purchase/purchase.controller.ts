import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service.js';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly svc: PurchaseService) {}

  @Post('per-pay')
  perPay(@Body() body: { offeringId: string }) {
    return this.svc.runPerPay(body.offeringId);
  }

  @Post('day')
  purchaseDay(@Body() body: { offeringId: string }) {
    return this.svc.runPurchaseDay(body.offeringId);
  }
}

