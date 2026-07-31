import { Module } from '@nestjs/common';
import { DoctorController } from './presentation/controllers/doctor.controller';
import { DoctorService } from './application/use-cases/doctor.service';
import { DoctorRepository } from './infrastructure/database/doctor.repository';
import { DatabaseModule } from '@database/database.module';
import { QrModule } from '@modules/qr/qr.module';

@Module({
  imports: [DatabaseModule, QrModule],

  controllers: [DoctorController],
  providers: [
    DoctorService,
    {
      provide: 'IDoctorRepository',
      useClass: DoctorRepository,
    },
  ],
  exports: [DoctorService],
})
export class DoctorModule {}
