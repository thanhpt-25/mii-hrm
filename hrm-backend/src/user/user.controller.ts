import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt.guard';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../database/error.code';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
@Controller('users')
export class UserController {
  private saltOrRounds = 10;
  constructor(private readonly userService: UserService) {}

  /**
   * Function : create
   * @param createUserDto
   * Description : create new user
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    try {
      const createdUser = await this.userService.create({
        ...createUserDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PostgresErrorCode.UniqueViolation) {
          throw new BadRequestException({
            key: 'messages.MSG_USER_EXISTED',
            args: { email: createUserDto.email },
          });
        }
      }
      /**
       * Throw unknown exception
       */
      throw new InternalServerErrorException({
        key: 'messages.MSG_SYSTEM_ERROR',
        args: undefined,
      });
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll({});
  }
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string) {
    try {
      return await this.userService.findOne(username);
    } catch (e) {
      if (e instanceof Prisma.NotFoundError) {
        throw new NotFoundException({
          key: 'messages.MSG_USER_NOT_FOUND',
          args: { username: username },
        });
      }
      /**
       * Throw unknown exception
       */
      throw new InternalServerErrorException({
        key: 'messages.MSG_SYSTEM_ERROR',
        args: undefined,
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
