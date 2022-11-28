import { IsDateString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateRecruitmentRequestDto {
  @IsNotEmpty({ message: i18nValidationMessage('validations.NOT_EMPTY') })
  positionId: number;
  @IsNotEmpty()
  skillIds: number[];
  @IsNotEmpty()
  amount: number;
  @IsDateString()
  @IsNotEmpty()
  deadline: Date;
  @IsDateString()
  @IsNotEmpty()
  expectedDeadline: Date;
}
