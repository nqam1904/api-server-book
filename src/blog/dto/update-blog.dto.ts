import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
   @ApiProperty()
   @IsNotEmpty({ message: 'Title is not empty' })
   title: string;

   @ApiProperty()
   @IsNotEmpty({ message: 'author is not empty' })
   author: string;

   @ApiProperty()
   @IsNotEmpty({ message: 'Description is not empty' })
   description: string;
}
