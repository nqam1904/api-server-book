/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/users.entity';

export class CreateUserDto {
   @ApiProperty()
   firstName: string;

   @ApiProperty()
   lastName: string;

   @ApiProperty()
   phone: string;

   @ApiProperty()
   @IsNotEmpty({ message: 'Password is not empty' })
   @Length(12)
   password: string;

   @ApiProperty()
   @IsNotEmpty({ message: 'Email is not empty' })
   @IsEmail()
   email: string;

   @ApiProperty()
   role: Role;

   @ApiProperty()
   discordId: string;
}
