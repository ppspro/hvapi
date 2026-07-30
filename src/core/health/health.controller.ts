import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { DatabaseService } from '@database/database.service';

@ApiTags('Health & Operational Diagnostics')
@Controller()
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get('health')
  @ApiOperation({ summary: 'Platform Health Check' })
  @SwaggerResponse({ status: 200, description: 'Application is operating normally.' })
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'HVAPI Backend',
    };
  }

  @Get('ready')
  @ApiOperation({ summary: 'Platform Readiness Probe' })
  @SwaggerResponse({ status: 200, description: 'Application and Database are ready to process traffic.' })
  async getReadiness() {
    try {
      await this.db.$queryRaw`SELECT 1`;
      return {
        status: 'ready',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        status: 'ready',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('live')
  @ApiOperation({ summary: 'Platform Liveness Probe' })
  @SwaggerResponse({ status: 200, description: 'Application container process is live.' })
  getLiveness() {
    return {
      status: 'live',
      uptimeSeconds: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
