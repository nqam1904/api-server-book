/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/configuration.config';
import { AuthModule } from './auth/auth.module';

@Module({
   imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule],

   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
