import { ApiProperty } from '@nestjs/swagger';

export class WalletPassResponseDto {
  @ApiProperty({ example: 'pkpass.file.buffer', description: 'Base64 encoded string pass payload' })
  passPayload!: string;

  @ApiProperty({ example: 'application/vnd.apple.pkpass', description: 'MIME type of the pass file' })
  mimeType!: string;
}
