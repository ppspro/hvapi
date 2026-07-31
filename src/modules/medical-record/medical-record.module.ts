import { Module } from '@nestjs/common';
import { MedicalRecordController, AttachmentController } from './presentation/controllers/medical-record.controller';
import { MedicalRecordService } from './application/use-cases/medical-record.service';
import { MedicalRecordRepository } from './infrastructure/database/medical-record.repository';
import { DatabaseModule } from '@database/database.module';
import { QrModule } from '@modules/qr/qr.module';

@Module({
  imports: [DatabaseModule, QrModule],

  controllers: [MedicalRecordController, AttachmentController],
  providers: [
    MedicalRecordService,
    {
      provide: 'IMedicalRecordRepository',
      useClass: MedicalRecordRepository,
    },
  ],
  exports: [MedicalRecordService],
})
export class MedicalRecordModule {}
