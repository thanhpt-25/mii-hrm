import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecruitmentRequestService } from './recruitment-request.service';
import { CreateRecruitmentRequestDto } from './dto/create-recruitment-request.dto';
import { UpdateRecruitmentRequestDto } from './dto/update-recruitment-request.dto';

@Controller('recruitment-request')
export class RecruitmentRequestController {
  constructor(
    private readonly recruitmentRequestService: RecruitmentRequestService,
  ) {}

  @Post()
  async create(@Body() createRecruitmentRequestDto: CreateRecruitmentRequestDto) {
    return await this.recruitmentRequestService.create(
      createRecruitmentRequestDto,
    );
  }

  @Get()
  async findAll() {
    return await this.recruitmentRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecruitmentRequestDto: UpdateRecruitmentRequestDto) {
    return this.recruitmentRequestService.update(+id, updateRecruitmentRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentRequestService.remove(+id);
  }
}
