/* eslint-disable prettier/prettier */

import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
   @IsNotEmpty({ message: 'Email is not empty' })
   title: string;

   @IsNotEmpty({ message: 'Email is not empty' })
   author: string;
}
