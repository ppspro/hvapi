import { ApiProperty } from '@nestjs/swagger';

export class HealthCardDetailsResponseDto {
  @ApiProperty({ example: 'card-uuid' })
  id!: string;

  @ApiProperty({ example: 'HV360-1234-5678-9012' })
  cardNumber!: string;

  @ApiProperty({ example: 'ACTIVE' })
  status!: string;

  @ApiProperty({ example: '2026-07-30T17:25:54.000Z' })
  issuedAt!: Date;

  @ApiProperty({ example: '2027-07-30T17:25:54.000Z' })
  expiresAt!: Date;

  @ApiProperty({ example: 'encrypted.payload.hash' })
  qrPayload?: string;
}
