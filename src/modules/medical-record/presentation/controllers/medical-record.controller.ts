import {
  Controller, Post, Get, Put, Patch, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MedicalRecordService } from '../../application/use-cases/medical-record.service';
import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { CreateAttachmentDto, UpdateAttachmentDto } from '../dto/create-attachment.dto';
import {
  MedicalRecordResponseDto,
  MedicalAttachmentResponseDto,
  AttachmentVersionResponseDto,
  MedicalTimelineItemDto,
} from '../dto/medical-record-response.dto';

@ApiTags('Medical Records')
@Controller('medical-records')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class MedicalRecordController {
  constructor(private readonly service: MedicalRecordService) {}

  // ─── Medical Records Endpoints ─────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new medical record with encounter, vitals, diagnosis, and procedures' })
  @SwaggerResponse({ status: 201, type: MedicalRecordResponseDto })
  async createRecord(@Req() req: any, @Body() dto: CreateMedicalRecordDto): Promise<MedicalRecordResponseDto> {
    return this.service.createRecord(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all medical records for the authenticated patient' })
  @SwaggerResponse({ status: 200, type: [MedicalRecordResponseDto] })
  async getRecords(@Req() req: any): Promise<MedicalRecordResponseDto[]> {
    return this.service.getRecords(req.user.userId);
  }

  @Get('timeline')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get unified medical timeline combining records and attachments' })
  @SwaggerResponse({ status: 200, type: [MedicalTimelineItemDto] })
  async getTimeline(@Req() req: any): Promise<MedicalTimelineItemDto[]> {
    return this.service.getTimeline(req.user.userId);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search medical records by title, complaints, notes, diagnosis, or plan' })
  @ApiQuery({ name: 'q', description: 'Search term', required: true })
  @SwaggerResponse({ status: 200, type: [MedicalRecordResponseDto] })
  async searchRecords(@Req() req: any, @Query('q') query: string): Promise<MedicalRecordResponseDto[]> {
    return this.service.searchRecords(req.user.userId, query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific medical record by ID' })
  @ApiParam({ name: 'id', description: 'Medical Record ID' })
  @SwaggerResponse({ status: 200, type: MedicalRecordResponseDto })
  async getRecordById(@Req() req: any, @Param('id') id: string): Promise<MedicalRecordResponseDto> {
    return this.service.getRecordById(req.user.userId, id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing medical record (blocked if ARCHIVED)' })
  @ApiParam({ name: 'id', description: 'Medical Record ID' })
  @SwaggerResponse({ status: 200, type: MedicalRecordResponseDto })
  async updateRecord(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateMedicalRecordDto): Promise<MedicalRecordResponseDto> {
    return this.service.updateRecord(req.user.userId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a medical record' })
  @ApiParam({ name: 'id', description: 'Medical Record ID' })
  @SwaggerResponse({ status: 200, description: 'Medical record soft-deleted' })
  async softDeleteRecord(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.service.softDeleteRecord(req.user.userId, id);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Archive a medical record (makes record immutable)' })
  @ApiParam({ name: 'id', description: 'Medical Record ID' })
  @SwaggerResponse({ status: 200, type: MedicalRecordResponseDto })
  async archiveRecord(@Req() req: any, @Param('id') id: string): Promise<MedicalRecordResponseDto> {
    return this.service.archiveRecord(req.user.userId, id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted or archived medical record' })
  @ApiParam({ name: 'id', description: 'Medical Record ID' })
  @SwaggerResponse({ status: 200, type: MedicalRecordResponseDto })
  async restoreRecord(@Req() req: any, @Param('id') id: string): Promise<MedicalRecordResponseDto> {
    return this.service.restoreRecord(req.user.userId, id);
  }

  @Post(':id/attachments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload and link an attachment to a specific medical record' })
  @ApiParam({ name: 'id', description: 'Medical Record ID' })
  @SwaggerResponse({ status: 201, type: MedicalAttachmentResponseDto })
  async uploadRecordAttachment(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: CreateAttachmentDto,
  ): Promise<MedicalAttachmentResponseDto> {
    return this.service.uploadAttachment(req.user.userId, id, dto);
  }

  @Get(':id/attachments')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all attachments linked to a specific medical record' })
  @ApiParam({ name: 'id', description: 'Medical Record ID' })
  @SwaggerResponse({ status: 200, type: [MedicalAttachmentResponseDto] })
  async getRecordAttachments(@Req() req: any, @Param('id') id: string): Promise<MedicalAttachmentResponseDto[]> {
    return this.service.getRecordAttachments(req.user.userId, id);
  }
}

@ApiTags('Attachments Platform')
@Controller('attachments')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class AttachmentController {
  constructor(private readonly service: MedicalRecordService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload an unlinked or global attachment (reusable across system)' })
  @SwaggerResponse({ status: 201, type: MedicalAttachmentResponseDto })
  async uploadGlobalAttachment(@Req() req: any, @Body() dto: CreateAttachmentDto): Promise<MedicalAttachmentResponseDto> {
    return this.service.uploadAttachment(req.user.userId, null, dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get attachment metadata by ID' })
  @ApiParam({ name: 'id', description: 'Attachment ID' })
  @SwaggerResponse({ status: 200, type: MedicalAttachmentResponseDto })
  async getAttachmentById(@Req() req: any, @Param('id') id: string): Promise<MedicalAttachmentResponseDto> {
    return this.service.getAttachmentById(req.user.userId, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update attachment category, metadata, or upload a new file version' })
  @ApiParam({ name: 'id', description: 'Attachment ID' })
  @SwaggerResponse({ status: 200, type: MedicalAttachmentResponseDto })
  async updateAttachment(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateAttachmentDto): Promise<MedicalAttachmentResponseDto> {
    return this.service.updateAttachment(req.user.userId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete an attachment' })
  @ApiParam({ name: 'id', description: 'Attachment ID' })
  @SwaggerResponse({ status: 200, description: 'Attachment soft-deleted' })
  async softDeleteAttachment(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.service.softDeleteAttachment(req.user.userId, id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted attachment' })
  @ApiParam({ name: 'id', description: 'Attachment ID' })
  @SwaggerResponse({ status: 200, type: MedicalAttachmentResponseDto })
  async restoreAttachment(@Req() req: any, @Param('id') id: string): Promise<MedicalAttachmentResponseDto> {
    return this.service.restoreAttachment(req.user.userId, id);
  }

  @Get(':id/versions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get file version history for an attachment' })
  @ApiParam({ name: 'id', description: 'Attachment ID' })
  @SwaggerResponse({ status: 200, type: [AttachmentVersionResponseDto] })
  async getAttachmentVersions(@Req() req: any, @Param('id') id: string): Promise<AttachmentVersionResponseDto[]> {
    return this.service.getAttachmentVersions(req.user.userId, id);
  }
}
