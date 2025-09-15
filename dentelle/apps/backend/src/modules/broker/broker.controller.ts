import { Body, Controller, Post } from '@nestjs/common';
import { BrokerService } from './broker.service.js';

@Controller('broker')
export class BrokerController {
  constructor(private readonly broker: BrokerService) {}

  @Post('instruction')
  generate(@Body() body: { offeringId: string }) {
    return this.broker.generateInstruction(body.offeringId);
  }
}

