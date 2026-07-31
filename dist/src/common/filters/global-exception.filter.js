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
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const client_1 = require("@prisma/client");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        let errorName = 'InternalServerError';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const resPayload = exception.getResponse();
            errorName = exception.name;
            message = typeof resPayload === 'object' && resPayload.message ? resPayload.message : exception.message;
        }
        else if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            errorName = `DatabaseError(${exception.code})`;
            if (exception.code === 'P2002') {
                status = common_1.HttpStatus.CONFLICT;
                message = 'A unique constraint violation occurred on the database fields.';
            }
            else if (exception.code === 'P2025') {
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Record requested for operation does not exist.';
            }
            else {
                status = common_1.HttpStatus.BAD_REQUEST;
                message = exception.message;
            }
        }
        else if (exception instanceof Error) {
            errorName = exception.name;
            message = exception.message;
        }
        this.logger.error({
            msg: 'Unexpected exception caught by filter',
            error: errorName,
            message,
            path: request.url,
            exception: exception instanceof Error ? { stack: exception.stack } : exception,
        });
        const errorResponse = {
            success: false,
            statusCode: status,
            error: errorName,
            message,
            meta: {
                timestamp: new Date().toISOString(),
                path: request.url,
                traceId: request.headers['x-trace-id'] || undefined,
            },
        };
        response.status(status).json(errorResponse);
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [nestjs_pino_1.Logger])
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map