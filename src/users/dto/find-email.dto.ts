/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindEmailDto {
   @ApiProperty()
   @IsNotEmpty({ message: 'Email is not empty' })
   @IsEmail()
   email: string;
}
