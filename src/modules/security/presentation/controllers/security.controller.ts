import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SecurityService } from '../../application/use-cases/security.service';
import {
  ConsentRecordResponseDto, RetentionPolicyResponseDto, SecurityIncidentResponseDto,
  EncryptionKeyResponseDto, ComplianceReportResponseDto, SecurityAuditLogResponseDto,
  SecurityDashboardResponseDto,
} from '../dto/security-response.dto';
import {
  CreateConsentDto, CreateRetentionPolicyDto, UpdateRetentionPolicyDto,
  CreateSecurityIncidentDto, ResolveSecurityIncidentDto, GenerateComplianceReportDto,
} from '../dto/security-enterprise.dto';

@ApiTags('Security & Compliance')
@Controller('security')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  // ─── Dashboard Stats ─────────────────────────────────────────────────────

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Enterprise Security & Compliance Dashboard summary' })
  @SwaggerResponse({ status: 200, type: SecurityDashboardResponseDto })
  async getDashboard(): Promise<SecurityDashboardResponseDto> {
    return this.securityService.getDashboardStats();
  }

  // ─── Consents ─────────────────────────────────────────────────────────────

  @Post('consents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Capture patient consent record' })
  @SwaggerResponse({ status: 201, type: ConsentRecordResponseDto })
  async createConsent(@Req() req: any, @Body() dto: CreateConsentDto): Promise<ConsentRecordResponseDto> {
    return this.securityService.createConsent(req.user.userId, dto);
  }

  @Get('consents')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List patient consents with optional filters' })
  @ApiQuery({ name: 'patientId', required: false })
  @ApiQuery({ name: 'status', required: false })
  @SwaggerResponse({ status: 200, type: [ConsentRecordResponseDto] })
  async getConsents(
    @Query('patientId') patientId?: string,
    @Query('status') status?: string,
  ): Promise<ConsentRecordResponseDto[]> {
    return this.securityService.getConsents(patientId, status);
  }

  @Get('consents/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get consent record details by ID' })
  @ApiParam({ name: 'id', description: 'Consent ID' })
  @SwaggerResponse({ status: 200, type: ConsentRecordResponseDto })
  async getConsentById(@Param('id') id: string): Promise<ConsentRecordResponseDto> {
    return this.securityService.getConsentById(id);
  }

  @Post('consents/:id/withdraw')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Withdraw patient consent' })
  @ApiParam({ name: 'id', description: 'Consent ID' })
  @SwaggerResponse({ status: 200, type: ConsentRecordResponseDto })
  async withdrawConsent(@Req() req: any, @Param('id') id: string): Promise<ConsentRecordResponseDto> {
    return this.securityService.withdrawConsent(id, req.user.userId);
  }

  // ─── Retention Policies ──────────────────────────────────────────────────

  @Post('retention')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create data retention policy' })
  @SwaggerResponse({ status: 201, type: RetentionPolicyResponseDto })
  async createRetentionPolicy(
    @Req() req: any,
    @Body() dto: CreateRetentionPolicyDto,
  ): Promise<RetentionPolicyResponseDto> {
    return this.securityService.createRetentionPolicy(req.user.userId, dto);
  }

  @Get('retention')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all data retention policies' })
  @SwaggerResponse({ status: 200, type: [RetentionPolicyResponseDto] })
  async getRetentionPolicies(): Promise<RetentionPolicyResponseDto[]> {
    return this.securityService.getRetentionPolicies();
  }

  @Put('retention/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update retention policy parameters' })
  @ApiParam({ name: 'id', description: 'Retention Policy ID' })
  @SwaggerResponse({ status: 200, type: RetentionPolicyResponseDto })
  async updateRetentionPolicy(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateRetentionPolicyDto,
  ): Promise<RetentionPolicyResponseDto> {
    return this.securityService.updateRetentionPolicy(id, dto, req.user.userId);
  }

  @Delete('retention/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a retention policy' })
  @ApiParam({ name: 'id', description: 'Retention Policy ID' })
  @SwaggerResponse({ status: 200, description: 'Retention policy soft-deleted' })
  async softDeleteRetentionPolicy(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.securityService.softDeleteRetentionPolicy(id, req.user.userId);
  }

  // ─── Security Incidents ──────────────────────────────────────────────────

  @Post('incidents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Report a security incident' })
  @SwaggerResponse({ status: 201, type: SecurityIncidentResponseDto })
  async createIncident(
    @Req() req: any,
    @Body() dto: CreateSecurityIncidentDto,
  ): Promise<SecurityIncidentResponseDto> {
    return this.securityService.createIncident(req.user.userId, dto);
  }

  @Get('incidents')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List reported security incidents' })
  @ApiQuery({ name: 'severity', required: false })
  @ApiQuery({ name: 'status', required: false })
  @SwaggerResponse({ status: 200, type: [SecurityIncidentResponseDto] })
  async getIncidents(
    @Query('severity') severity?: string,
    @Query('status') status?: string,
  ): Promise<SecurityIncidentResponseDto[]> {
    return this.securityService.getIncidents(severity, status);
  }

  @Put('incidents/:id/resolve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark security incident as RESOLVED' })
  @ApiParam({ name: 'id', description: 'Incident ID' })
  @SwaggerResponse({ status: 200, type: SecurityIncidentResponseDto })
  async resolveIncident(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: ResolveSecurityIncidentDto,
  ): Promise<SecurityIncidentResponseDto> {
    return this.securityService.resolveIncident(id, req.user.userId, dto);
  }

  // ─── Encryption Key Management ───────────────────────────────────────────

  @Get('keys/active')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get active KMS encryption key metadata' })
  @SwaggerResponse({ status: 200, type: EncryptionKeyResponseDto })
  async getActiveEncryptionKey(): Promise<EncryptionKeyResponseDto> {
    return this.securityService.getActiveEncryptionKey();
  }

  @Post('keys/rotate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Trigger KMS encryption key rotation' })
  @SwaggerResponse({ status: 200, type: EncryptionKeyResponseDto })
  async rotateEncryptionKey(@Req() req: any): Promise<EncryptionKeyResponseDto> {
    return this.securityService.rotateEncryptionKey(req.user.userId);
  }

  // ─── Compliance Reports ─────────────────────────────────────────────────

  @Post('compliance/report')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Generate automated compliance assessment report' })
  @SwaggerResponse({ status: 201, type: ComplianceReportResponseDto })
  async generateComplianceReport(
    @Req() req: any,
    @Body() dto: GenerateComplianceReportDto,
  ): Promise<ComplianceReportResponseDto> {
    return this.securityService.generateComplianceReport(req.user.userId, dto);
  }

  @Get('compliance/reports')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List generated compliance reports' })
  @SwaggerResponse({ status: 200, type: [ComplianceReportResponseDto] })
  async getComplianceReports(): Promise<ComplianceReportResponseDto[]> {
    return this.securityService.getComplianceReports();
  }

  // ─── Audit ───────────────────────────────────────────────────────────────

  @Get('audit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List security audit logs' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'resource', required: false })
  @SwaggerResponse({ status: 200, type: [SecurityAuditLogResponseDto] })
  async getAuditLogs(
    @Query('userId') userId?: string,
    @Query('resource') resource?: string,
  ): Promise<SecurityAuditLogResponseDto[]> {
    return this.securityService.getAuditLogs(userId, resource);
  }
}
