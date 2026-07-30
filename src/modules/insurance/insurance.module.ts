import { Module } from '@nestjs/common';
import { InsuranceController } from './presentation/controllers/insurance.controller';
import { InsuranceService } from './application/use-cases/insurance.service';
import { InsuranceRepository } from './infrastructure/database/insurance.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InsuranceController],
  providers: [
    InsuranceService,
    {
      provide: 'IInsuranceRepository',
      useClass: InsuranceRepository,
    },
  ],
  exports: [InsuranceService],
})
export class InsuranceModule {}
