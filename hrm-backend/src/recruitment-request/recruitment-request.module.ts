import { Module } from '@nestjs/common';
import { RecruitmentRequestService } from './recruitment-request.service';
import { RecruitmentRequestController } from './recruitment-request.controller';

@Module({
  controllers: [RecruitmentRequestController],
  providers: [RecruitmentRequestService]
})
export class RecruitmentRequestModule {}
