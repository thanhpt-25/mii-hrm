import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruitmentRequestDto } from './create-recruitment-request.dto';

export class UpdateRecruitmentRequestDto extends PartialType(CreateRecruitmentRequestDto) {}
