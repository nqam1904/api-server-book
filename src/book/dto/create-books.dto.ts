/* eslint-disable prettier/prettier */

import { IsNotEmpty, Length } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { Media } from '../../media/entities/media.entity';

export class CreateBooksDto {
   @IsNotEmpty({ message: 'Ttile is not empty' })
   title: string;

   imagesId: number[];

   images: Media[];

   categoriesId: number[];

   categories: Category[];

   @IsNotEmpty({ message: 'Author is not empty' })
   author: string;
}
