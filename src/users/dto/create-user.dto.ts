/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
   firstName: string;
   lastName: string;
   phone: string;

   @IsNotEmpty({ message: 'Password is not empty' })
   @Length(12)
   password: string;

   @IsNotEmpty({ message: 'Email is not empty' })
   @IsEmail()
   email: string;
}
