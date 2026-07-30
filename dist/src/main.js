"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const logger = app.get(nestjs_pino_1.Logger);
    app.useLogger(logger);
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const globalPrefix = process.env.GLOBAL_PREFIX || 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Health Vault 360 (HVAPI) Enterprise API')
        .setDescription('Centralized clinical & identity platform backend for Health Vault 360')
        .setVersion('1.0.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-Auth')
        .addTag('Health & Operational Diagnostics', 'Platform probes')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const swaggerPath = process.env.SWAGGER_PATH || 'docs';
    swagger_1.SwaggerModule.setup(swaggerPath, app, document);
    app.enableShutdownHooks();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`HVAPI Enterprise Server running on http://localhost:${port}/${globalPrefix}/v1`);
    logger.log(`OpenAPI Swagger documentation available at http://localhost:${port}/${swaggerPath}`);
}
bootstrap();
//# sourceMappingURL=main.js.map