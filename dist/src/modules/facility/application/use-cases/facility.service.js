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
exports.FacilityService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let FacilityService = class FacilityService {
    constructor(facilityRepository, logger) {
        this.facilityRepository = facilityRepository;
        this.logger = logger;
    }
    async listFacilities() {
        const list = await this.facilityRepository.findAllFacilities();
        return list.map(f => ({
            id: f.id,
            name: f.name,
            address: f.address,
            phone: f.phone,
        }));
    }
    async getFacilityDetails(facilityId) {
        const facility = await this.facilityRepository.findFacilityById(facilityId);
        if (!facility) {
            throw new common_1.NotFoundException('Facility not found');
        }
        this.logger.log({ msg: 'Facility viewed', facilityId });
        return {
            id: facility.id,
            name: facility.name,
            address: facility.address,
            phone: facility.phone,
        };
    }
    async listDepartments(facilityId) {
        const facility = await this.facilityRepository.findFacilityById(facilityId);
        if (!facility) {
            throw new common_1.NotFoundException('Facility not found');
        }
        this.logger.log({ msg: 'Department listing requested', facilityId });
        const list = await this.facilityRepository.findDepartmentsByFacilityId(facilityId);
        return list.map(d => ({
            id: d.id,
            name: d.name,
            description: d.description || undefined,
        }));
    }
    async listDoctors(facilityId) {
        const facility = await this.facilityRepository.findFacilityById(facilityId);
        if (!facility) {
            throw new common_1.NotFoundException('Facility not found');
        }
        this.logger.log({ msg: 'Doctors list viewed for facility', facilityId });
        const list = await this.facilityRepository.findDoctorsByFacilityId(facilityId);
        return list.map(d => ({
            id: d.id,
            fullName: d.fullName,
            specialization: d.specialization,
            credentials: d.credentials,
        }));
    }
};
exports.FacilityService = FacilityService;
exports.FacilityService = FacilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IFacilityRepository')),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.Logger])
], FacilityService);
//# sourceMappingURL=facility.service.js.map