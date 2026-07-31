import {
  Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StaffService } from '../../application/use-cases/staff.service';
import {
  RegisterStaffDto, AddStaffQualificationDto, AttachStaffDocumentDto,
  AssignStaffFacilityDto, AssignStaffDepartmentDto, StaffActionDto,
} from '../dto/register-staff.dto';
import {
  StaffFullResponseDto, StaffDocumentResponseDto, StaffHistoryItemDto, StaffStatsResponseDto,
} from '../dto/staff-response.dto';

@ApiTags('Staff')
@Controller('staff')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register/Create a staff member profile in Master Workforce Registry' })
  @SwaggerResponse({ status: 201, type: StaffFullResponseDto })
  async registerStaff(@Req() req: any, @Body() dto: RegisterStaffDto): Promise<StaffFullResponseDto> {
    return this.staffService.registerStaff(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all registered staff members in Master Workforce Registry' })
  @SwaggerResponse({ status: 200, type: [StaffFullResponseDto] })
  async getStaffMembers(): Promise<StaffFullResponseDto[]> {
    return this.staffService.getStaffMembers();
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enterprise staff search (by name, code, designation, staff type)' })
  @ApiQuery({ name: 'q', required: true })
  @SwaggerResponse({ status: 200, type: [StaffFullResponseDto] })
  async searchStaff(@Query('q') query: string): Promise<StaffFullResponseDto[]> {
    return this.staffService.searchStaff(query);
  }

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get platform-wide workforce directory statistics' })
  @SwaggerResponse({ status: 200, type: StaffStatsResponseDto })
  async getStatistics(): Promise<StaffStatsResponseDto> {
    return this.staffService.getStatistics();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get complete staff member details' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: StaffFullResponseDto })
  async getStaffById(@Param('id') id: string): Promise<StaffFullResponseDto> {
    return this.staffService.getStaffById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update staff member profile details' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: StaffFullResponseDto })
  async updateStaff(@Param('id') id: string, @Body() dto: Partial<RegisterStaffDto>): Promise<StaffFullResponseDto> {
    return this.staffService.updateStaff(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a staff member profile' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, description: 'Staff member soft-deleted' })
  async softDeleteStaff(@Param('id') id: string): Promise<any> {
    return this.staffService.softDeleteStaff(id);
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve & verify staff registration' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: StaffFullResponseDto })
  async verifyStaff(@Req() req: any, @Param('id') id: string, @Body() dto: StaffActionDto): Promise<StaffFullResponseDto> {
    return this.staffService.verifyStaff(id, dto, req.user.userId);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suspend staff registration' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: StaffFullResponseDto })
  async suspendStaff(@Req() req: any, @Param('id') id: string, @Body() dto: StaffActionDto): Promise<StaffFullResponseDto> {
    return this.staffService.suspendStaff(id, dto, req.user.userId);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore suspended staff registration' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: StaffFullResponseDto })
  async restoreStaff(@Req() req: any, @Param('id') id: string, @Body() dto: StaffActionDto): Promise<StaffFullResponseDto> {
    return this.staffService.restoreStaff(id, dto, req.user.userId);
  }

  @Post(':id/generate-qr')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate Staff Digital Identity QR token' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, description: 'Generated QR Token details' })
  async generateQr(@Req() req: any, @Param('id') id: string): Promise<any> {
    return this.staffService.generateQr(req.user.userId, id);
  }

  @Post(':id/assign-facility')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign staff member to primary / secondary facilities' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: StaffFullResponseDto })
  async assignFacility(@Param('id') id: string, @Body() dto: AssignStaffFacilityDto): Promise<StaffFullResponseDto> {
    return this.staffService.assignFacility(id, dto);
  }

  @Post(':id/assign-department')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign staff member to primary / secondary departments' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: StaffFullResponseDto })
  async assignDepartment(@Param('id') id: string, @Body() dto: AssignStaffDepartmentDto): Promise<StaffFullResponseDto> {
    return this.staffService.assignDepartment(id, dto);
  }

  @Get(':id/documents')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List attached staff credential documents' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: [StaffDocumentResponseDto] })
  async getDocuments(@Param('id') id: string): Promise<StaffDocumentResponseDto[]> {
    return this.staffService.getDocuments(id);
  }

  @Post(':id/documents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Attach credential document (reusing MedicalAttachment)' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 201, type: StaffDocumentResponseDto })
  async attachDocument(@Param('id') id: string, @Body() dto: AttachStaffDocumentDto): Promise<StaffDocumentResponseDto> {
    return this.staffService.attachDocument(id, dto);
  }

  @Get(':id/history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get complete verification & employment status history' })
  @ApiParam({ name: 'id', description: 'Staff Member Profile ID' })
  @SwaggerResponse({ status: 200, type: [StaffHistoryItemDto] })
  async getHistory(@Param('id') id: string): Promise<StaffHistoryItemDto[]> {
    return this.staffService.getHistory(id);
  }
}
