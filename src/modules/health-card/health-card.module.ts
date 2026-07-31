import { Module } from '@nestjs/common';
import { HealthCardController } from './presentation/controllers/health-card.controller';
import { HealthCardService } from './application/use-cases/health-card.service';
import { HealthCardRepository } from './infrastructure/database/health-card.repository';
import { DatabaseModule } from '@database/database.module';
import { QrModule } from '@modules/qr/qr.module';

@Module({
  imports: [DatabaseModule, QrModule],

  controllers: [HealthCardController],
  providers: [
    HealthCardService,
    {
      provide: 'IHealthCardRepository',
      useClass: HealthCardRepository,
    },
  ],
  exports: [HealthCardService],
})
export class HealthCardModule {}
