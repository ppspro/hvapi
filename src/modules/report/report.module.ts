import { Module } from '@nestjs/common';
import { ReportController } from './presentation/controllers/report.controller';
import { ReportService } from './application/use-cases/report.service';
import { ReportRepository } from './infrastructure/database/report.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportController],
  providers: [
    ReportService,
    {
      provide: 'IReportRepository',
      useClass: ReportRepository,
    },
  ],
  exports: [ReportService],
})
export class ReportModule {}
