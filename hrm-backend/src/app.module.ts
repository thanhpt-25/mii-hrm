import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import JWTConfig from './config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import {
  I18nModule,
  I18nJsonLoader,
  AcceptLanguageResolver,
  QueryResolver,
} from 'nestjs-i18n';
import I18nConfig from './config/i18n.config';
import * as path from 'path';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [JWTConfig, I18nConfig],
    }),
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        fallbackLanguage: config.get('i18n').DEFAULT_LANG,
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      loader: I18nJsonLoader,
      inject: [ConfigService],
    }),
    AuthenticationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
