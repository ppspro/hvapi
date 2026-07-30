export interface EnvironmentVariables {
  PORT: number;
  NODE_ENV: 'development' | 'staging' | 'production';
  GLOBAL_PREFIX: string;
  SWAGGER_PATH: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  REFRESH_TOKEN_EXPIRATION: string;
  LOG_LEVEL: string;
}

export const configuration = (): EnvironmentVariables => ({
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: (process.env.NODE_ENV as any) || 'development',
  GLOBAL_PREFIX: process.env.GLOBAL_PREFIX || 'api',
  SWAGGER_PATH: process.env.SWAGGER_PATH || 'docs',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hvapi_db?schema=public',
  JWT_SECRET: process.env.JWT_SECRET || 'hvapi_default_secret_key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '15m',
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
});
