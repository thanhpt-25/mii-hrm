import { Injectable } from '@nestjs/common';
import { CreateRecruitmentRequestDto } from './dto/create-recruitment-request.dto';
import { UpdateRecruitmentRequestDto } from './dto/update-recruitment-request.dto';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class RecruitmentRequestService {
  constructor(private prisma: DatabaseService) {}
  async create(createRecruitmentRequestDto: CreateRecruitmentRequestDto) {
    // We create connection with master skills
    const skills = createRecruitmentRequestDto.skillIds?.map((skill) => ({
      id: skill,
    }));
    // Then we delete unnecessary attribute skillIds because it is not stored in recruitment request table
    delete createRecruitmentRequestDto.skillIds;
    // Now we create recruitment request and connect it with skills
    return await this.prisma.recruitmentRequest.create({
      data: {
        ...createRecruitmentRequestDto,
        skills: {
          connect: skills,
        },
        deadline: new Date(createRecruitmentRequestDto.deadline),
        expectedDeadline: new Date(
          createRecruitmentRequestDto.expectedDeadline,
        ),
      },
    });
  }

  async findAll() {
    return await this.prisma.recruitmentRequest.findMany({
      include: { position: true, skills: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.recruitmentRequest.findMany({
      include: { position: true, skills: true },
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateRecruitmentRequestDto: UpdateRecruitmentRequestDto) {
    return `This action updates a #${id} recruitmentRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruitmentRequest`;
  }
}
