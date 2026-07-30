declare enum Environment {
    Development = "development",
    Staging = "staging",
    Production = "production"
}
declare class EnvironmentVariablesDto {
    PORT: number;
    NODE_ENV: Environment;
    GLOBAL_PREFIX: string;
    DATABASE_URL: string;
}
export declare function validateEnvironment(config: Record<string, unknown>): EnvironmentVariablesDto;
export {};
