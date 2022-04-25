import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as awsconfig } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  awsconfig.update({
    region: 'us-east-2',
  });

  app.enableCors();

  await app.listen(5000);
}
bootstrap();
