import { Module } from '@nestjs/common';
import { RecruitmentRequestService } from './recruitment-request.service';
import { RecruitmentRequestController } from './recruitment-request.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [RecruitmentRequestController],
  providers: [RecruitmentRequestService, DatabaseService],
})
export class RecruitmentRequestModule {}
