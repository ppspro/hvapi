import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Pino Logger Integration
  const logger = app.get(Logger);
  app.useLogger(logger);

  // Security & Compression Middleware
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global Prefix & URI Versioning
  const globalPrefix = process.env.GLOBAL_PREFIX || 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global Exception Filters & Validation Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // OpenAPI Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Health Vault 360 (HVAPI) Enterprise API')
    .setDescription('Centralized clinical & identity platform backend for Health Vault 360')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-Auth')
    .addTag('Health & Operational Diagnostics', 'Platform probes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = process.env.SWAGGER_PATH || 'docs';
  SwaggerModule.setup(swaggerPath, app, document);

  // Register ResponseTransformInterceptor & Global Exception Filters
  const { ResponseTransformInterceptor } = await import('./common/interceptors/response-transform.interceptor');
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  // Enable Graceful Shutdown Hooks

  app.enableShutdownHooks();

  const port = process.env.PORT || 3073;
  await app.listen(port);
  logger.log(`HVAPI Enterprise Server running on http://localhost:${port}/${globalPrefix}/v1`);
  logger.log(`OpenAPI Swagger documentation available at http://localhost:${port}/${swaggerPath}`);
}

bootstrap();
