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

@Module({
   imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule, BookModule, CategoriesModule],

   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
