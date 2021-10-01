import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
   @IsNotEmpty({ message: 'Title is not empty' })
   title: string;

   @IsNotEmpty({ message: 'author is not empty' })
   author: string;
}
