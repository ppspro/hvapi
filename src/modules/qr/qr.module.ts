import { Module } from '@nestjs/common';
import { QrController } from './presentation/controllers/qr.controller';
import { QrService } from './application/use-cases/qr.service';
import { QrRepository } from './infrastructure/database/qr.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QrController],
  providers: [
    QrService,
    {
      provide: 'IQrRepository',
      useClass: QrRepository,
    },
  ],
  exports: [QrService],
})
export class QrModule {}
