import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

class EnvironmentVariablesDto {
  @IsNumber()
  PORT!: number;

  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsString()
  GLOBAL_PREFIX!: string;

  @IsString()
  DATABASE_URL!: string;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariablesDto, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Environment Validation Error: ${errors.toString()}`);
  }
  return validatedConfig;
}
