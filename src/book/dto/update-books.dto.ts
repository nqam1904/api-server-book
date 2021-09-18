import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateBooksDto } from './create-books.dto';

export class UpdateBooksDto extends PartialType(CreateBooksDto) {
   @IsNotEmpty({ message: 'Title is not empty' })
   title: string;

   @IsNotEmpty({ message: 'author is not empty' })
   author: string;
}
