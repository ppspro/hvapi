import { Module } from '@nestjs/common';
import { ScheduleController } from './presentation/controllers/schedule.controller';
import { ShiftController } from './presentation/controllers/shift.controller';
import { HolidayController } from './presentation/controllers/holiday.controller';
import { ScheduleService } from './application/use-cases/schedule.service';
import { SlotEngineService } from './application/use-cases/slot-engine.service';
import { ScheduleRepository } from './infrastructure/database/schedule.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ScheduleController, ShiftController, HolidayController],
  providers: [
    ScheduleService,
    SlotEngineService,
    {
      provide: 'IScheduleRepository',
      useClass: ScheduleRepository,
    },
  ],
  exports: [ScheduleService, SlotEngineService],
})
export class ScheduleModule {}
