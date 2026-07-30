"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    PORT: parseInt(process.env.PORT || '3000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    GLOBAL_PREFIX: process.env.GLOBAL_PREFIX || 'api',
    SWAGGER_PATH: process.env.SWAGGER_PATH || 'docs',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hvapi_db?schema=public',
    JWT_SECRET: process.env.JWT_SECRET || 'hvapi_default_secret_key',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '15m',
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
});
exports.configuration = configuration;
//# sourceMappingURL=env.config.js.map