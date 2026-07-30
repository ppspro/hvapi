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
export declare const configuration: () => EnvironmentVariables;
