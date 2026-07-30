import { Module } from '@nestjs/common';
import { HealthCardController } from './presentation/controllers/health-card.controller';
import { HealthCardService } from './application/use-cases/health-card.service';
import { HealthCardRepository } from './infrastructure/database/health-card.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
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
