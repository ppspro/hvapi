import { Module } from '@nestjs/common';
import { ReportsController } from './presentation/controllers/reports.controller';
import { ReportingService } from './application/use-cases/reports.service';
import { ReportsRepository } from './infrastructure/database/reports.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportsController],
  providers: [
    ReportingService,
    {
      provide: 'IReportsRepository',
      useClass: ReportsRepository,
    },
  ],
  exports: [ReportingService],
})
export class ReportsModule {}
