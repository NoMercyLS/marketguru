import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const swaggerCfg = new DocumentBuilder()
    .setTitle('MarketGuru Test Task')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, 'localhost');
  console.log(`App listening on ${await app.getUrl()}`);
}

bootstrap();
