import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule, { cors: true });
   const config = new DocumentBuilder()

      .setTitle('Books for discord')
      .setDescription('The Books API')
      .setVersion('1.0')
      .addTag('books')
      .addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' }, 'access-token')
      .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
   await app.listen(process.env.PORT || 8080);
}
bootstrap();
