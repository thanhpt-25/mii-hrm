import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap().then((r) => console.log(r));
