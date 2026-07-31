"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrModule = void 0;
const common_1 = require("@nestjs/common");
const qr_controller_1 = require("./presentation/controllers/qr.controller");
const qr_service_1 = require("./application/use-cases/qr.service");
const qr_repository_1 = require("./infrastructure/database/qr.repository");
const database_module_1 = require("../../database/database.module");
let QrModule = class QrModule {
};
exports.QrModule = QrModule;
exports.QrModule = QrModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [qr_controller_1.QrController],
        providers: [
            qr_service_1.QrService,
            {
                provide: 'IQrRepository',
                useClass: qr_repository_1.QrRepository,
            },
        ],
        exports: [qr_service_1.QrService],
    })
], QrModule);
//# sourceMappingURL=qr.module.js.map