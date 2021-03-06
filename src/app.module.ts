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
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';

@Module({
   imports: [
      ServeStaticModule.forRoot({
         rootPath: join(__dirname, '..', 'uploads'),
         exclude: ['/api*'],
      }),
      TypeOrmModule.forRoot(typeOrmConfig),
      MulterModule.register({
         dest: '../uploads',
      }),
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      UsersModule,
      AuthModule,
      BookModule,
      CategoriesModule,
      MediaModule,
      BlogModule,
   ],

   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
