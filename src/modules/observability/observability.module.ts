import { Module } from '@nestjs/common';
import { ObservabilityController } from './presentation/controllers/observability.controller';
import { ObservabilityService } from './application/use-cases/observability.service';
import { PrismaObservabilityRepository } from './infrastructure/database/observability.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ObservabilityController],
  providers: [
    ObservabilityService,
    {
      provide: 'IObservabilityRepository',
      useClass: PrismaObservabilityRepository,
    },
  ],
  exports: [ObservabilityService],
})
export class ObservabilityModule {}
