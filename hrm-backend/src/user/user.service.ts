import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: '$2b$10$78QToWYap9xJshegFcI2Ze.f63QkDHi4j6k8U9MWbLMYuJW0qiiey',
    },
    {
      id: 2,
      username: 'maria',
      password: '$2b$10$78QToWYap9xJshegFcI2Ze.f63QkDHi4j6k8U9MWbLMYuJW0qiiey',
    },
  ];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
