import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { MediaModule } from '../media/media.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Books } from './entities/books.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Books]), MediaModule, CategoriesModule],
   controllers: [BookController],
   providers: [BookService],
   exports: [BookService],
})
export class BookModule {}
