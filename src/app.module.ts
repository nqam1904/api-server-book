/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/configuration.config';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CategoriesModule } from './categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { MediaModule } from './media/media.module';

@Module({
   imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      MulterModule.register({
         dest: '../uploads',
      }),
      UsersModule,
      AuthModule,
      BookModule,
      CategoriesModule,
      MediaModule,
   ],

   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
