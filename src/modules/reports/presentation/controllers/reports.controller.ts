import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReportingService } from '../../application/use-cases/reports.service';
import {
  ReportDefinitionResponseDto, GeneratedReportResponseDto, DashboardWidgetResponseDto,
  AnalyticsSnapshotResponseDto, ExecutiveDashboardResponseDto,
} from '../dto/reports-response.dto';
import {
  CreateReportDefinitionDto, GenerateReportDto, CreateDashboardWidgetDto,
  ReorderWidgetsDto, CreateAnalyticsSnapshotDto,
} from '../dto/reports-enterprise.dto';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class ReportsController {
  constructor(private readonly reportingService: ReportingService) {}

  // ─── Executive Dashboard ──────────────────────────────────────────────────

  @Get('dashboard/executive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Executive Dashboard platform summary statistics' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @SwaggerResponse({ status: 200, type: ExecutiveDashboardResponseDto })
  async getExecutiveDashboard(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<ExecutiveDashboardResponseDto> {
    return this.reportingService.getExecutiveDashboard(startDate, endDate);
  }

  // ─── Module Analytics ────────────────────────────────────────────────────

  @Get('analytics/modules/:module')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get domain analytics for a specific module' })
  @ApiParam({ name: 'module', description: 'Module name (patient, doctor, facility, staff, insurance, immunisation)' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @SwaggerResponse({ status: 200, description: 'Module specific analytics' })
  async getModuleAnalytics(
    @Param('module') module: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<any> {
    return this.reportingService.getModuleAnalytics(module, startDate, endDate);
  }

  // ─── Report Definitions ──────────────────────────────────────────────────

  @Post('definitions')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Report Definition' })
  @SwaggerResponse({ status: 201, type: ReportDefinitionResponseDto })
  async createDefinition(
    @Req() req: any,
    @Body() dto: CreateReportDefinitionDto,
  ): Promise<ReportDefinitionResponseDto> {
    return this.reportingService.createDefinition(req.user.userId, dto);
  }

  @Get('definitions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List Report Definitions, optionally filtered by module' })
  @ApiQuery({ name: 'module', required: false })
  @SwaggerResponse({ status: 200, type: [ReportDefinitionResponseDto] })
  async getDefinitions(@Query('module') module?: string): Promise<ReportDefinitionResponseDto[]> {
    return this.reportingService.getDefinitions(module);
  }

  @Get('definitions/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Report Definition by ID' })
  @ApiParam({ name: 'id', description: 'Report Definition ID' })
  @SwaggerResponse({ status: 200, type: ReportDefinitionResponseDto })
  async getDefinitionById(@Param('id') id: string): Promise<ReportDefinitionResponseDto> {
    return this.reportingService.getDefinitionById(id);
  }

  @Put('definitions/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a Report Definition' })
  @ApiParam({ name: 'id', description: 'Report Definition ID' })
  @SwaggerResponse({ status: 200, type: ReportDefinitionResponseDto })
  async updateDefinition(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<CreateReportDefinitionDto>,
  ): Promise<ReportDefinitionResponseDto> {
    return this.reportingService.updateDefinition(id, dto, req.user.userId);
  }

  @Delete('definitions/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a Report Definition' })
  @ApiParam({ name: 'id', description: 'Report Definition ID' })
  @SwaggerResponse({ status: 200, description: 'Report Definition soft-deleted' })
  async softDeleteDefinition(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.reportingService.softDeleteDefinition(id, req.user.userId);
  }

  // ─── Generated Reports & Exports ──────────────────────────────────────────

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Generate a report based on a Report Definition or custom filters' })
  @SwaggerResponse({ status: 201, type: GeneratedReportResponseDto })
  async generateReport(@Req() req: any, @Body() dto: GenerateReportDto): Promise<GeneratedReportResponseDto> {
    return this.reportingService.generateReport(req.user.userId, dto);
  }

  @Get('generated')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List generated reports for user or platform' })
  @SwaggerResponse({ status: 200, type: [GeneratedReportResponseDto] })
  async getGeneratedReports(@Req() req: any): Promise<GeneratedReportResponseDto[]> {
    return this.reportingService.getGeneratedReports(req.user.userId);
  }

  @Get('generated/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get generated report details' })
  @ApiParam({ name: 'id', description: 'Generated Report ID' })
  @SwaggerResponse({ status: 200, type: GeneratedReportResponseDto })
  async getGeneratedReportById(@Param('id') id: string): Promise<GeneratedReportResponseDto> {
    return this.reportingService.getGeneratedReportById(id);
  }

  @Post('generated/:id/export')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Export a generated report to PDF, CSV, XLSX, or JSON' })
  @ApiParam({ name: 'id', description: 'Generated Report ID' })
  @ApiQuery({ name: 'format', required: true, enum: ['PDF', 'CSV', 'XLSX', 'JSON'] })
  @SwaggerResponse({ status: 200, type: GeneratedReportResponseDto })
  async exportReport(
    @Req() req: any,
    @Param('id') id: string,
    @Query('format') format: string,
  ): Promise<GeneratedReportResponseDto> {
    return this.reportingService.exportReport(id, format || 'JSON', req.user.userId);
  }

  // ─── Dashboard Widgets ───────────────────────────────────────────────────

  @Post('widgets')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new configurable Dashboard Widget' })
  @SwaggerResponse({ status: 201, type: DashboardWidgetResponseDto })
  async createWidget(@Body() dto: CreateDashboardWidgetDto): Promise<DashboardWidgetResponseDto> {
    return this.reportingService.createWidget(dto);
  }

  @Get('widgets')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List configured Dashboard Widgets' })
  @ApiQuery({ name: 'isEnabledOnly', required: false, type: Boolean })
  @SwaggerResponse({ status: 200, type: [DashboardWidgetResponseDto] })
  async getWidgets(@Query('isEnabledOnly') isEnabledOnly?: boolean): Promise<DashboardWidgetResponseDto[]> {
    return this.reportingService.getWidgets(isEnabledOnly);
  }

  @Put('widgets/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a Dashboard Widget configuration' })
  @ApiParam({ name: 'id', description: 'Widget ID' })
  @SwaggerResponse({ status: 200, type: DashboardWidgetResponseDto })
  async updateWidget(
    @Param('id') id: string,
    @Body() dto: Partial<CreateDashboardWidgetDto>,
  ): Promise<DashboardWidgetResponseDto> {
    return this.reportingService.updateWidget(id, dto);
  }

  @Post('widgets/reorder')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reorder Dashboard Widgets display order' })
  @SwaggerResponse({ status: 200, description: 'Widgets reordered' })
  async reorderWidgets(@Body() dto: ReorderWidgetsDto): Promise<any> {
    return this.reportingService.reorderWidgets(dto);
  }

  // ─── Analytics Snapshots ─────────────────────────────────────────────────

  @Post('snapshots')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Record an immutable Analytics Snapshot' })
  @SwaggerResponse({ status: 201, type: AnalyticsSnapshotResponseDto })
  async createAnalyticsSnapshot(@Body() dto: CreateAnalyticsSnapshotDto): Promise<AnalyticsSnapshotResponseDto> {
    return this.reportingService.createAnalyticsSnapshot(dto);
  }

  @Get('snapshots')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Analytics Snapshots for a module and metric' })
  @ApiQuery({ name: 'module', required: true })
  @ApiQuery({ name: 'metric', required: true })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @SwaggerResponse({ status: 200, type: [AnalyticsSnapshotResponseDto] })
  async getAnalyticsSnapshots(
    @Query('module') module: string,
    @Query('metric') metric: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<AnalyticsSnapshotResponseDto[]> {
    return this.reportingService.getAnalyticsSnapshots(module, metric, startDate, endDate);
  }
}
