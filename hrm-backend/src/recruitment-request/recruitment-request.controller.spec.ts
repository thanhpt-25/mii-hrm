import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentRequestController } from './recruitment-request.controller';
import { RecruitmentRequestService } from './recruitment-request.service';

describe('RecruitmentRequestController', () => {
  let controller: RecruitmentRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentRequestController],
      providers: [RecruitmentRequestService],
    }).compile();

    controller = module.get<RecruitmentRequestController>(RecruitmentRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
