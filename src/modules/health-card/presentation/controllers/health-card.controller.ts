import {
  Controller, Post, Get, Put, Patch, Delete, Body, Param, Query, UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HealthCardService } from '../../application/use-cases/health-card.service';
import { IssueCardDto, CardActionDto, UpdateCardDto } from '../dto/issue-card.dto';
import { FullHealthCardResponseDto, HealthCardHistoryItemDto } from '../dto/full-health-card.dto';
import { VerifyQrDto, VerifyQrResponseDto } from '../dto/verify-qr.dto';

@ApiTags('Health Cards')
@Controller('health-cards')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-Auth')
export class HealthCardController {
  constructor(private readonly healthCardService: HealthCardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Issue a new Health Card for authenticated patient' })
  @SwaggerResponse({ status: 201, type: FullHealthCardResponseDto })
  async issueCard(@Req() req: any, @Body() dto: IssueCardDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.issueCard(req.user.userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get active Health Card details for current patient' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async getActiveCard(@Req() req: any): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.getActiveCard(req.user.userId);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search Health Cards by card number or patient name' })
  @ApiQuery({ name: 'q', required: true, description: 'Search term' })
  @SwaggerResponse({ status: 200, type: [FullHealthCardResponseDto] })
  async searchCards(@Query('q') query: string): Promise<FullHealthCardResponseDto[]> {
    return this.healthCardService.searchCards(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get specific Health Card details by ID' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async getCardById(@Req() req: any, @Param('id') id: string): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.getCardById(req.user.userId, id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Health Card emergency flag or metadata' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async updateCard(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateCardDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.updateCard(req.user.userId, id, dto);
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate an ISSUED or DEACTIVATED Health Card' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async activateCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.activateCard(req.user.userId, id, dto);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate Health Card' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async deactivateCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.deactivateCard(req.user.userId, id, dto);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suspend Health Card' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async suspendCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.suspendCard(req.user.userId, id, dto);
  }

  @Post(':id/block')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Block Health Card for security or lost card reasons' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async blockCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.blockCard(req.user.userId, id, dto);
  }

  @Post(':id/unblock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unblock a BLOCKED Health Card' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async unblockCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.unblockCard(req.user.userId, id, dto);
  }

  @Post(':id/replace')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Replace Health Card — generates a new card number and increments version' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async replaceCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.replaceCard(req.user.userId, id, dto);
  }

  @Post(':id/renew')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renew Health Card — extends validity period by 1 year' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async renewCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.renewCard(req.user.userId, id, dto);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Archive Health Card' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async archiveCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.archiveCard(req.user.userId, id, dto);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore an ARCHIVED Health Card' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: FullHealthCardResponseDto })
  async restoreCard(@Req() req: any, @Param('id') id: string, @Body() dto: CardActionDto): Promise<FullHealthCardResponseDto> {
    return this.healthCardService.restoreCard(req.user.userId, id, dto);
  }

  @Get(':id/history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get complete status lifecycle audit history for Health Card' })
  @ApiParam({ name: 'id', description: 'Health Card ID' })
  @SwaggerResponse({ status: 200, type: [HealthCardHistoryItemDto] })
  async getCardHistory(@Req() req: any, @Param('id') id: string): Promise<HealthCardHistoryItemDto[]> {
    return this.healthCardService.getCardHistory(req.user.userId, id);
  }

  @Post('verify-qr')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify digital Health Card QR payload' })
  @SwaggerResponse({ status: 200, type: VerifyQrResponseDto })
  async verifyQr(@Req() req: any, @Body() dto: VerifyQrDto): Promise<VerifyQrResponseDto> {
    return this.healthCardService.verifyQr(dto, req.user.userId);
  }
}
