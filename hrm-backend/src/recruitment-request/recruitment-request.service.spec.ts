import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentRequestService } from './recruitment-request.service';

describe('RecruitmentRequestService', () => {
  let service: RecruitmentRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitmentRequestService],
    }).compile();

    service = module.get<RecruitmentRequestService>(RecruitmentRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
