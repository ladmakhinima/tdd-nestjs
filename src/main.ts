import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('APP_CONFIG_PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  app.listen(port, async () => {
    console.log(`The server running : ${await app.getUrl()}`);
  });
};

bootstrap();
