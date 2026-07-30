"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let DoctorService = class DoctorService {
    constructor(doctorRepository, logger) {
        this.doctorRepository = doctorRepository;
        this.logger = logger;
    }
    async getDoctorProfile(doctorId) {
        const doctor = await this.doctorRepository.findDoctorById(doctorId);
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        this.logger.log({ msg: 'Doctor profile viewed', doctorId });
        return {
            id: doctor.id,
            fullName: doctor.fullName,
            specialization: doctor.specialization,
            credentials: doctor.credentials,
        };
    }
    async getDoctorSlots(doctorId) {
        const doctor = await this.doctorRepository.findDoctorById(doctorId);
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        this.logger.log({ msg: 'Availability lookup requested for doctor', doctorId });
        const slots = await this.doctorRepository.findSlotsByDoctorId(doctorId);
        return slots.map(s => ({
            id: s.id,
            startTime: s.startTime,
            endTime: s.endTime,
            isBooked: s.isBooked,
        }));
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IDoctorRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map