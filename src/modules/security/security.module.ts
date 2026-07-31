import { Module } from '@nestjs/common';
import { SecurityController } from './presentation/controllers/security.controller';
import { SecurityService } from './application/use-cases/security.service';
import { PrismaSecurityRepository } from './infrastructure/database/security.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SecurityController],
  providers: [
    SecurityService,
    {
      provide: 'ISecurityRepository',
      useClass: PrismaSecurityRepository,
    },
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
