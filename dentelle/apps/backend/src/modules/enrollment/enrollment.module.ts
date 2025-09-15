import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [EnrollmentController],
})
export class EnrollmentModule {}

