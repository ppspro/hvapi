import { Module } from '@nestjs/common';
import { PatientController } from './presentation/controllers/patient.controller';
import { PatientService } from './application/use-cases/patient.service';
import { PatientRepository } from './infrastructure/database/patient.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientController],
  providers: [
    PatientService,
    {
      provide: 'IPatientRepository',
      useClass: PatientRepository,
    },
  ],
  exports: [PatientService],
})
export class PatientModule {}
