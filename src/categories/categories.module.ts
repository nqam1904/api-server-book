import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from '../media/media.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Category]), MediaModule],
   controllers: [CategoriesController],
   providers: [CategoriesService],
   exports: [CategoriesService],
})
export class CategoriesModule {}
