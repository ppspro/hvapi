import { Module } from '@nestjs/common';
import { CmsController } from './presentation/controllers/cms.controller';
import { CmsService } from './application/use-cases/cms.service';
import { CmsRepository } from './infrastructure/database/cms.repository';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CmsController],
  providers: [
    CmsService,
    {
      provide: 'ICmsRepository',
      useClass: CmsRepository,
    },
  ],
  exports: [CmsService],
})
export class CmsModule {}
