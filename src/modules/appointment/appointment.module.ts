import { Module } from '@nestjs/common';
import { AppointmentController } from './presentation/controllers/appointment.controller';
import { AppointmentService } from './application/use-cases/appointment.service';
import { AppointmentRepository } from './infrastructure/database/appointment.repository';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
  exports: [AppointmentService],
})
export class AppointmentModule {}
