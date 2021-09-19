import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const config = new DocumentBuilder()
      .setTitle('Books for discord')
      .setDescription('The Books API')
      .setVersion('1.0')
      .addTag('books')
      .addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' }, 'access-token')
      .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
   app.use('/', express.static(join(__dirname, '..', 'uploads')));
   await app.listen(8080);
}
bootstrap();
