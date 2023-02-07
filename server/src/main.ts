import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  await app.listen(7654);
}
bootstrap();
