import { Module } from '@nestjs/common';
import { ImmunisationController } from './presentation/controllers/immunisation.controller';
import { ImmunisationService } from './application/use-cases/immunisation.service';
import { ImmunisationRepository } from './infrastructure/database/immunisation.repository';
import { DatabaseModule } from '@database/database.module';
import { QrModule } from '@modules/qr/qr.module';

@Module({
  imports: [DatabaseModule, QrModule],
  controllers: [ImmunisationController],
  providers: [
    ImmunisationService,
    {
      provide: 'IImmunisationRepository',
      useClass: ImmunisationRepository,
    },
  ],
  exports: [ImmunisationService],
})
export class ImmunisationModule {}
