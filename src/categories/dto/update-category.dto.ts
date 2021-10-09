import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Media } from '../../media/entities/media.entity';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
   @ApiProperty()
   name: string;

   @ApiProperty()
   imagesId: number[];

   images: Media[];
}
