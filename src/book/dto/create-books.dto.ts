/* eslint-disable prettier/prettier */

import { IsNotEmpty, Length } from 'class-validator';

export class CreateBooksDto {
   @IsNotEmpty({ message: 'Ttile is not empty' })
   title: string;

   @IsNotEmpty({ message: 'Author is not empty' })
   author: string;
}
