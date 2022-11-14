import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt').JWT_SECRET,
          signOptions: {
            expiresIn: `${configService.get('jwt').JWT_EXPIRATION_TIME}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, ConfigService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
