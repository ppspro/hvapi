"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const env_config_1 = require("./config/env.config");
const env_validation_1 = require("./config/env.validation");
const database_module_1 = require("./database/database.module");
const health_module_1 = require("./core/health/health.module");
const auth_module_1 = require("./modules/auth/auth.module");
const patient_module_1 = require("./modules/patient/patient.module");
const doctor_module_1 = require("./modules/doctor/doctor.module");
const facility_module_1 = require("./modules/facility/facility.module");
const health_card_module_1 = require("./modules/health-card/health-card.module");
const appointment_module_1 = require("./modules/appointment/appointment.module");
const report_module_1 = require("./modules/report/report.module");
const insurance_module_1 = require("./modules/insurance/insurance.module");
const cms_module_1 = require("./modules/cms/cms.module");
const admin_module_1 = require("./modules/admin/admin.module");
const family_module_1 = require("./modules/family/family.module");
const medical_record_module_1 = require("./modules/medical-record/medical-record.module");
const qr_module_1 = require("./modules/qr/qr.module");
const immunisation_module_1 = require("./modules/immunisation/immunisation.module");
const staff_module_1 = require("./modules/staff/staff.module");
const schedule_module_1 = require("./modules/schedule/schedule.module");
const reports_module_1 = require("./modules/reports/reports.module");
const governance_module_1 = require("./modules/governance/governance.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [env_config_1.configuration],
                validate: env_validation_1.validateEnvironment,
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
                    level: process.env.LOG_LEVEL || 'info',
                },
            }),
            database_module_1.DatabaseModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            patient_module_1.PatientModule,
            doctor_module_1.DoctorModule,
            facility_module_1.FacilityModule,
            health_card_module_1.HealthCardModule,
            appointment_module_1.AppointmentModule,
            report_module_1.ReportModule,
            insurance_module_1.InsuranceModule,
            cms_module_1.CmsModule,
            admin_module_1.AdminModule,
            family_module_1.FamilyModule,
            medical_record_module_1.MedicalRecordModule,
            qr_module_1.QrModule,
            immunisation_module_1.ImmunisationModule,
            staff_module_1.StaffModule,
            schedule_module_1.ScheduleModule,
            reports_module_1.ReportsModule,
            governance_module_1.GovernanceModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map