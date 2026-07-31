import { Module } from '@nestjs/common';
import { FamilyController } from './presentation/controllers/family.controller';
import { FamilyService } from './application/use-cases/family.service';
import { FamilyRepository } from './infrastructure/database/family.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FamilyController],
  providers: [
    FamilyService,
    {
      provide: 'IFamilyRepository',
      useClass: FamilyRepository,
    },
  ],
  exports: [FamilyService],
})
export class FamilyModule {}
