import { Module } from '@nestjs/common';
import { ReferralController } from './presentation/controllers/referral.controller';
import { ReferralService } from './application/use-cases/referral.service';
import { PrismaReferralRepository } from './infrastructure/database/referral.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReferralController],
  providers: [
    ReferralService,
    {
      provide: 'IReferralRepository',
      useClass: PrismaReferralRepository,
    },
  ],
  exports: [ReferralService],
})
export class ReferralModule {}
