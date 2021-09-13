/* eslint-disable prettier/prettier */
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Users])],
   providers: [UsersService],
   controllers: [UsersController],
   exports: [UsersService],
})
export class UsersModule {}
