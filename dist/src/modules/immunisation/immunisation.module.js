"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImmunisationModule = void 0;
const common_1 = require("@nestjs/common");
const immunisation_controller_1 = require("./presentation/controllers/immunisation.controller");
const immunisation_service_1 = require("./application/use-cases/immunisation.service");
const immunisation_repository_1 = require("./infrastructure/database/immunisation.repository");
const database_module_1 = require("../../database/database.module");
const qr_module_1 = require("../qr/qr.module");
let ImmunisationModule = class ImmunisationModule {
};
exports.ImmunisationModule = ImmunisationModule;
exports.ImmunisationModule = ImmunisationModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, qr_module_1.QrModule],
        controllers: [immunisation_controller_1.ImmunisationController],
        providers: [
            immunisation_service_1.ImmunisationService,
            {
                provide: 'IImmunisationRepository',
                useClass: immunisation_repository_1.ImmunisationRepository,
            },
        ],
        exports: [immunisation_service_1.ImmunisationService],
    })
], ImmunisationModule);
//# sourceMappingURL=immunisation.module.js.map