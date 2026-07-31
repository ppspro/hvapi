"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservabilityModule = void 0;
const common_1 = require("@nestjs/common");
const observability_controller_1 = require("./presentation/controllers/observability.controller");
const observability_service_1 = require("./application/use-cases/observability.service");
const observability_repository_1 = require("./infrastructure/database/observability.repository");
const database_module_1 = require("../../database/database.module");
let ObservabilityModule = class ObservabilityModule {
};
exports.ObservabilityModule = ObservabilityModule;
exports.ObservabilityModule = ObservabilityModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [observability_controller_1.ObservabilityController],
        providers: [
            observability_service_1.ObservabilityService,
            {
                provide: 'IObservabilityRepository',
                useClass: observability_repository_1.PrismaObservabilityRepository,
            },
        ],
        exports: [observability_service_1.ObservabilityService],
    })
], ObservabilityModule);
//# sourceMappingURL=observability.module.js.map