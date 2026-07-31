import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from '../../application/use-cases/notification.service';
import {
  NotificationTemplateResponseDto, NotificationResponseDto, NotificationPreferenceResponseDto,
  NotificationQueueResponseDto, NotificationAuditLogResponseDto, NotificationDashboardResponseDto,
} from '../dto/notification-response.dto';
import {
  CreateTemplateDto, UpdateTemplateDto, CreateNotificationDto,
  UpdateNotificationPreferenceDto, RetryQueueDto,
} from '../dto/notification-enterprise.dto';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // ─── Dashboard Stats ─────────────────────────────────────────────────────

  @Get('dashboard/stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Enterprise Notification Platform stats & queue summary' })
  @SwaggerResponse({ status: 200, type: NotificationDashboardResponseDto })
  async getDashboardStats(): Promise<NotificationDashboardResponseDto> {
    return this.notificationService.getDashboardStats();
  }

  // ─── Notifications ───────────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Publish/dispatch a notification across channels' })
  @SwaggerResponse({ status: 201, type: NotificationResponseDto })
  async createNotification(@Req() req: any, @Body() dto: CreateNotificationDto): Promise<NotificationResponseDto> {
    return this.notificationService.createNotification(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List notifications for recipient or platform' })
  @ApiQuery({ name: 'recipientUserId', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'QUEUED', 'SENT', 'DELIVERED', 'FAILED', 'READ'] })
  @SwaggerResponse({ status: 200, type: [NotificationResponseDto] })
  async getNotifications(
    @Query('recipientUserId') recipientUserId?: string,
    @Query('status') status?: string,
  ): Promise<NotificationResponseDto[]> {
    return this.notificationService.getNotifications(recipientUserId, status);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get notification details by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @SwaggerResponse({ status: 200, type: NotificationResponseDto })
  async getNotificationById(@Param('id') id: string): Promise<NotificationResponseDto> {
    return this.notificationService.getNotificationById(id);
  }

  @Put(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark notification as READ' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @SwaggerResponse({ status: 200, type: NotificationResponseDto })
  async markAsRead(@Req() req: any, @Param('id') id: string): Promise<NotificationResponseDto> {
    return this.notificationService.markAsRead(id, req.user.userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @SwaggerResponse({ status: 200, description: 'Notification soft-deleted' })
  async softDeleteNotification(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.notificationService.softDeleteNotification(id, req.user.userId);
  }

  // ─── Preferences ─────────────────────────────────────────────────────────

  @Get('preferences')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user notification preferences' })
  @SwaggerResponse({ status: 200, type: NotificationPreferenceResponseDto })
  async getPreferences(@Req() req: any): Promise<NotificationPreferenceResponseDto> {
    return this.notificationService.getPreferences(req.user.userId);
  }

  @Put('preferences')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update current user notification channel preferences' })
  @SwaggerResponse({ status: 200, type: NotificationPreferenceResponseDto })
  async updatePreferences(
    @Req() req: any,
    @Body() dto: UpdateNotificationPreferenceDto,
  ): Promise<NotificationPreferenceResponseDto> {
    return this.notificationService.updatePreferences(req.user.userId, dto);
  }

  // ─── Queue ───────────────────────────────────────────────────────────────

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List pending/queued notification delivery items' })
  @SwaggerResponse({ status: 200, type: [NotificationQueueResponseDto] })
  async getPendingQueueItems(): Promise<NotificationQueueResponseDto[]> {
    return this.notificationService.getPendingQueueItems();
  }

  @Post('queue/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry queued/failed notification delivery attempts' })
  @SwaggerResponse({ status: 200, description: 'Retry execution result' })
  async retryQueue(@Req() req: any, @Body() dto: RetryQueueDto): Promise<{ retried: number }> {
    return this.notificationService.retryQueue(dto, req.user.userId);
  }

  // ─── Audit ───────────────────────────────────────────────────────────────

  @Get('audit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List notification audit logs' })
  @SwaggerResponse({ status: 200, type: [NotificationAuditLogResponseDto] })
  async getAuditLogs(): Promise<NotificationAuditLogResponseDto[]> {
    return this.notificationService.getAuditLogs();
  }
}
