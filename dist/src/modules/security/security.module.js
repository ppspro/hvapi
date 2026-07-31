"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const security_controller_1 = require("./presentation/controllers/security.controller");
const security_service_1 = require("./application/use-cases/security.service");
const security_repository_1 = require("./infrastructure/database/security.repository");
const database_module_1 = require("../../database/database.module");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [security_controller_1.SecurityController],
        providers: [
            security_service_1.SecurityService,
            {
                provide: 'ISecurityRepository',
                useClass: security_repository_1.PrismaSecurityRepository,
            },
        ],
        exports: [security_service_1.SecurityService],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map