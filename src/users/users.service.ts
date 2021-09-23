/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(Users)
      private readonly usersRepository: Repository<Users>,
   ) {}

   async create(createUserDto: CreateUserDto) {
      const password = await bcrypt.hash(createUserDto.password, 10);
      const user = (new Users(), { ...createUserDto, password });
      const res = await this.usersRepository.save(user);
      res.password = '';
      return res;
   }

   async findAll(): Promise<Users[]> {
      const user = await this.usersRepository.find();
      const data = _.map(user, (e) => _.omit(e, ['password']));
      return data;
   }

   findByEmail(email: string): Promise<Users> {
      return this.usersRepository.findOne({
         email,
      });
   }

   findOne(id: number): Promise<Users> {
      return this.usersRepository.findOne(id);
   }

   update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
      return this.usersRepository.save({
         id,
         ...updateUserDto,
      });
   }

   async remove(id: number): Promise<any> {
      try {
         const idUser = await this.usersRepository.findOne(id);
         if (idUser) {
            await this.usersRepository.delete(id);
            return { message: 'ok' };
         } else {
            return { message: 'Not found id' };
         }
      } catch (error) {}
   }
}
