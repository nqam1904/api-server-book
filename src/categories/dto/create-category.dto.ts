/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Media } from '../../media/entities/media.entity';

export class CreateCategoryDto {
   @ApiProperty()
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   imagesId: number[];

   images: Media[];
}
