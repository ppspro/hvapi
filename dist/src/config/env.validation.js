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
exports.validateEnvironment = validateEnvironment;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Staging"] = "staging";
    Environment["Production"] = "production";
})(Environment || (Environment = {}));
class EnvironmentVariablesDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariablesDto.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Environment),
    __metadata("design:type", String)
], EnvironmentVariablesDto.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesDto.prototype, "GLOBAL_PREFIX", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesDto.prototype, "DATABASE_URL", void 0);
function validateEnvironment(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvironmentVariablesDto, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(`Environment Validation Error: ${errors.toString()}`);
    }
    return validatedConfig;
}
//# sourceMappingURL=env.validation.js.map