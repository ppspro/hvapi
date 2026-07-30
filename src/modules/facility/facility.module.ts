import { Module } from '@nestjs/common';
import { FacilityController } from './presentation/controllers/facility.controller';
import { FacilityService } from './application/use-cases/facility.service';
import { FacilityRepository } from './infrastructure/database/facility.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FacilityController],
  providers: [
    FacilityService,
    {
      provide: 'IFacilityRepository',
      useClass: FacilityRepository,
    },
  ],
  exports: [FacilityService],
})
export class FacilityModule {}
