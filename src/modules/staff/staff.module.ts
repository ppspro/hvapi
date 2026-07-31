import { Module } from '@nestjs/common';
import { StaffController } from './presentation/controllers/staff.controller';
import { StaffService } from './application/use-cases/staff.service';
import { StaffRepository } from './infrastructure/database/staff.repository';
import { DatabaseModule } from '@database/database.module';
import { QrModule } from '@modules/qr/qr.module';

@Module({
  imports: [DatabaseModule, QrModule],
  controllers: [StaffController],
  providers: [
    StaffService,
    {
      provide: 'IStaffRepository',
      useClass: StaffRepository,
    },
  ],
  exports: [StaffService],
})
export class StaffModule {}
