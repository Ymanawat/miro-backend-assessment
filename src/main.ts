import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { RestApiModule } from './restapi.module';

async function bootstrap() {
  const app = await NestFactory.create(RestApiModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3001);
}
bootstrap();
