import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import * as requestIp from 'request-ip';
async function bootstrap() {
   const app = await NestFactory.create(AppModule, { cors: true });
   app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
   app.use(requestIp.mw());

   const config = new DocumentBuilder()
      .setTitle('Books for discord')
      .setDescription('The Books API')
      .setVersion('1.0')
      .addTag('books')
      .addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' }, 'access-token')
      .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
   const port = process.env.PORT || 8080;
   await app.listen(port);
}
bootstrap();
