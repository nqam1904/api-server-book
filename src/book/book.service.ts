import { CreateBooksDto } from './dto/create-books.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './entities/books.entity';
import { UpdateBooksDto } from './dto/update-books.dto';
import merge from '../shared/merge';

@Injectable()
export class BookService {
   constructor(
      @InjectRepository(Books)
      private readonly booksRepository: Repository<Books>,
   ) {}
   async create(createBooksDto: CreateBooksDto): Promise<Books> {
      const books = merge(new Books(), createBooksDto);
      books.title = createBooksDto.title;
      books.author = createBooksDto.author;
      return this.booksRepository.save(books);
   }
   findAll(): Promise<Books[]> {
      return this.booksRepository.find();
   }

   findOne(id: number): Promise<Books> {
      return this.booksRepository.findOne(id);
   }

   update(id: number, updateBooksDto: UpdateBooksDto): Promise<Books> {
      return this.booksRepository.save({
         id,
         ...updateBooksDto,
      });
   }

   async remove(id: number): Promise<any> {
      try {
         const book = await this.findOne(id);
         if (book) {
            await this.booksRepository.delete(id);
            return { message: 'ok' };
         } else {
            return { message: 'Not found id' };
         }
      } catch (error) {}
   }
}
