import { Module } from '@nestjs/common';
import { InsuranceController } from './presentation/controllers/insurance.controller';
import { InsuranceService } from './application/use-cases/insurance.service';
import { InsuranceRepository } from './infrastructure/database/insurance.repository';
import { DatabaseModule } from '@database/database.module';
import { QrModule } from '@modules/qr/qr.module';

@Module({
  imports: [DatabaseModule, QrModule],

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
