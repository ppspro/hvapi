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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../database/database.service");
let FacilityRepository = class FacilityRepository {
    constructor(db) {
        this.db = db;
    }
    async findAllFacilities() {
        return (await this.db.facility.findMany({
            orderBy: { name: 'asc' },
        }));
    }
    async findFacilityById(facilityId) {
        return (await this.db.facility.findUnique({
            where: { id: facilityId },
        }));
    }
    async findDepartmentsByFacilityId(facilityId) {
        return (await this.db.facilityDepartment.findMany({
            where: { facilityId },
            orderBy: { name: 'asc' },
        }));
    }
    async findDoctorsByFacilityId(facilityId) {
        const records = await this.db.doctorFacility.findMany({
            where: { facilityId },
            include: { doctor: true },
        });
        return records.map(r => r.doctor);
    }
};
exports.FacilityRepository = FacilityRepository;
exports.FacilityRepository = FacilityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FacilityRepository);
//# sourceMappingURL=facility.repository.js.map