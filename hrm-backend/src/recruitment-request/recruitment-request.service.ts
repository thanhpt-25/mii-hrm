import { Injectable } from '@nestjs/common';
import { CreateRecruitmentRequestDto } from './dto/create-recruitment-request.dto';
import { UpdateRecruitmentRequestDto } from './dto/update-recruitment-request.dto';

@Injectable()
export class RecruitmentRequestService {
  create(createRecruitmentRequestDto: CreateRecruitmentRequestDto) {
    return 'This action adds a new recruitmentRequest';
  }

  findAll() {
    return `This action returns all recruitmentRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruitmentRequest`;
  }

  update(id: number, updateRecruitmentRequestDto: UpdateRecruitmentRequestDto) {
    return `This action updates a #${id} recruitmentRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruitmentRequest`;
  }
}
