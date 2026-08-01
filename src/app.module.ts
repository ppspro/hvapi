import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { configuration } from '@config/env.config';
import { validateEnvironment } from '@config/env.validation';
import { DatabaseModule } from '@database/database.module';
import { HealthModule } from '@core/health/health.module';

import { AuthModule } from '@modules/auth/auth.module';
import { PatientModule } from '@modules/patient/patient.module';
import { DoctorModule } from '@modules/doctor/doctor.module';
import { FacilityModule } from '@modules/facility/facility.module';
import { HealthCardModule } from '@modules/health-card/health-card.module';
import { AppointmentModule } from '@modules/appointment/appointment.module';
import { ReportModule } from '@modules/report/report.module';
import { InsuranceModule } from '@modules/insurance/insurance.module';
import { CmsModule } from '@modules/cms/cms.module';
import { AdminModule } from '@modules/admin/admin.module';
import { FamilyModule } from '@modules/family/family.module';
import { MedicalRecordModule } from '@modules/medical-record/medical-record.module';
import { QrModule } from '@modules/qr/qr.module';
import { ImmunisationModule } from '@modules/immunisation/immunisation.module';
import { StaffModule } from '@modules/staff/staff.module';
import { ScheduleModule } from '@modules/schedule/schedule.module';
import { ReportsModule } from '@modules/reports/reports.module';
import { GovernanceModule } from '@modules/governance/governance.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { OcrModule } from '@modules/ocr/ocr.module';
import { SecurityModule } from '@modules/security/security.module';
import { ObservabilityModule } from '@modules/observability/observability.module';
import { ReferralModule } from '@modules/referral/referral.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnvironment,
    }),
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
        level: process.env.LOG_LEVEL || 'info',
      },
    }),
    DatabaseModule,
    HealthModule,

    // Enterprise Domain Modules
    AuthModule,
    PatientModule,
    DoctorModule,
    FacilityModule,
    HealthCardModule,
    AppointmentModule,
    ReportModule,
    InsuranceModule,
    CmsModule,
    AdminModule,
    FamilyModule,
    MedicalRecordModule,
    QrModule,
    ImmunisationModule,
    StaffModule,
    ScheduleModule,
    ReportsModule,
    GovernanceModule,
    NotificationsModule,
    OcrModule,
    SecurityModule,
    ObservabilityModule,
    ReferralModule,
  ],
})
export class AppModule {}
