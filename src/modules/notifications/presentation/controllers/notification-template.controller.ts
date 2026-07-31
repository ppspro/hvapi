import {
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from '../../application/use-cases/notification.service';
import { NotificationTemplateResponseDto } from '../dto/notification-response.dto';
import { CreateTemplateDto, UpdateTemplateDto } from '../dto/notification-enterprise.dto';

@ApiTags('Notification Templates')
@Controller('notifications/templates')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class NotificationTemplateController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new notification template with variable placeholders' })
  @SwaggerResponse({ status: 201, type: NotificationTemplateResponseDto })
  async createTemplate(@Req() req: any, @Body() dto: CreateTemplateDto): Promise<NotificationTemplateResponseDto> {
    return this.notificationService.createTemplate(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all notification templates' })
  @SwaggerResponse({ status: 200, type: [NotificationTemplateResponseDto] })
  async getTemplates(): Promise<NotificationTemplateResponseDto[]> {
    return this.notificationService.getTemplates();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get notification template by ID' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @SwaggerResponse({ status: 200, type: NotificationTemplateResponseDto })
  async getTemplateById(@Param('id') id: string): Promise<NotificationTemplateResponseDto> {
    return this.notificationService.getTemplateById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update template body or subject and increment version' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @SwaggerResponse({ status: 200, type: NotificationTemplateResponseDto })
  async updateTemplate(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateTemplateDto,
  ): Promise<NotificationTemplateResponseDto> {
    return this.notificationService.updateTemplate(id, dto, req.user.userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a notification template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @SwaggerResponse({ status: 200, description: 'Template soft-deleted' })
  async softDeleteTemplate(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.notificationService.softDeleteTemplate(id, req.user.userId);
  }
}
