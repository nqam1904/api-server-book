/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { Media } from '../../media/entities/media.entity';

export class CreateBlogDto {
   @ApiProperty()
   @IsNotEmpty({ message: 'Ttile is not empty' })
   title: string;

   @ApiProperty()
   @IsNotEmpty({ message: 'Description is not empty' })
   description: string;

   @ApiProperty()
   imagesId: number[];

   images: Media[];

   @ApiProperty()
   categoriesId: number[];

   categories: Category[];

   @ApiProperty()
   @IsNotEmpty({ message: 'Author is not empty' })
   author: string;
}
