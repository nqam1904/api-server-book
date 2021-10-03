/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      try {
         const email = await this.usersRepository.findOne({ email: createUserDto.email });
         if (!email) {
            const password = await bcrypt.hash(createUserDto.password, 10);
            const user = (new Users(), { ...createUserDto, password });
            user.discordId = '';
            const res = await this.usersRepository.save(user);
            delete res.password;
            return res;
         } else {
            throw new HttpException('Email already exists!', HttpStatus.BAD_REQUEST);
         }
      } catch (e) {
         console.log(e);
         throw new HttpException(e, HttpStatus.BAD_REQUEST);
      }
   }

   async findAll(): Promise<Users[]> {
      const user = await this.usersRepository.find();
      const data = _.map(user, (e) => _.omit(e, ['password']));
      return data;
   }

   async findByEmail(email: string): Promise<any> {
      try {
         const dataEmail = await this.usersRepository.findOne({ email: email });
         if (!_.isEmpty(dataEmail)) {
            return dataEmail;
         } else {
            throw new HttpException('Email not found', HttpStatus.BAD_REQUEST);
         }
      } catch (e) {
         throw new HttpException('Email not found', HttpStatus.BAD_REQUEST);
      }
   }

   findOne(id: number): Promise<Users> {
      return this.usersRepository.findOne(id);
   }

   async findIdDiscord(field: string, discordId: string): Promise<Users | undefined> {
      return this.usersRepository.findOne({ discordId: discordId });
   }

   async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
      try {
         const email = await this.usersRepository.findOne({ email: updateUserDto.email });
         if (!email) {
            return this.usersRepository.save({
               id,
               ...updateUserDto,
            });
         } else if (email) {
            return this.usersRepository.save({
               id,
               ...updateUserDto,
            });
         } else {
            throw new HttpException('Email already exists!', HttpStatus.BAD_REQUEST);
         }
      } catch (e) {
         throw new HttpException('Email already exists!', HttpStatus.BAD_REQUEST);
      }
   }

   async remove(id: number): Promise<any> {
      try {
         const idUser = await this.usersRepository.findOne(id);
         if (idUser) {
            await this.usersRepository.delete(id);
            return { isSuccess: true, messsage: 'ok' };
         } else {
            throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
         }
      } catch (error) {
         throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
      }
   }
   async createAccountDiscord(discordId: string, data: any): Promise<any> {
      const newUser = new Users();
      newUser.firstName = data.username.split(' ', 1).toString();
      newUser.lastName = _.last(data.username.split(' '));
      newUser.email = data.email;
      newUser.discordId = discordId;
      const res = await this.usersRepository.save(newUser);
      const { ...response } = _.omit(res, ['password']);
      return response;
   }
}
