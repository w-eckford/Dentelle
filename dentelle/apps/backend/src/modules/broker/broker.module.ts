import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service.js';
import { BrokerController } from './broker.controller.js';

@Module({
  providers: [BrokerService],
  controllers: [BrokerController],
  exports: [BrokerService],
})
export class BrokerModule {}

