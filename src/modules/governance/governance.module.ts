import { Module } from '@nestjs/common';
import { GovernanceController } from './presentation/controllers/governance.controller';
import { GovernanceService } from './application/use-cases/governance.service';
import { GovernanceRepository } from './infrastructure/database/governance.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GovernanceController],
  providers: [
    GovernanceService,
    {
      provide: 'IGovernanceRepository',
      useClass: GovernanceRepository,
    },
  ],
  exports: [GovernanceService],
})
export class GovernanceModule {}
