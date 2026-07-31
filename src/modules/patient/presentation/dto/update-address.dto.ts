import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressBlockDto {
  @ApiProperty({ example: '123 Main Street', required: false })
  @IsOptional()
  @IsString()
  line1?: string;

  @ApiProperty({ example: 'Apartment 4B', required: false })
  @IsOptional()
  @IsString()
  line2?: string;

  @ApiProperty({ example: 'Karachi', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Sindh', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 'South', required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: '74200', required: false })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({ example: 'Pakistan', required: false })
  @IsOptional()
  @IsString()
  country?: string;
}

export class UpdateAddressDto {
  @ApiProperty({ type: AddressBlockDto, required: false })
  @IsOptional()
  currentAddress?: AddressBlockDto;

  @ApiProperty({ type: AddressBlockDto, required: false })
  @IsOptional()
  permanentAddress?: AddressBlockDto;
}
