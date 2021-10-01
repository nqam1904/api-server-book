import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';
import { MediaModule } from '../media/media.module';
import { CategoriesModule } from '../categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([Blog]), MediaModule, CategoriesModule],
   providers: [BlogService],
   exports: [BlogService],
   controllers: [BlogController],
})
export class BlogModule {}
