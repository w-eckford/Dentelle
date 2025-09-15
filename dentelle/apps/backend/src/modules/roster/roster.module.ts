import { Module } from '@nestjs/common';
import { RosterController } from './roster.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RosterController],
})
export class RosterModule {}

