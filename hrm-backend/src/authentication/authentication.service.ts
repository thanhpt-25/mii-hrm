import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOne(username);
      const validated = await bcrypt.compare(password, user.password);
      if (validated) {
        user.password = undefined;
        return user;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }
  async login(user: User): Promise<any> {
    const payload = {
      id: user.id,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
