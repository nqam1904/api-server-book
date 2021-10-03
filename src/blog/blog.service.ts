import { UpdateBlogDto } from './dto/update-blog.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import merge from '../shared/merge';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
   // khai báo constructer reponsitory
   constructor(
      @InjectRepository(Blog)
      private readonly blogReponsitory: Repository<Blog>,
   ) {}

   async create(createBlog: CreateBlogDto): Promise<Blog> {
      const blog = merge(new Blog(), createBlog);
      blog.title = createBlog.title;
      blog.author = createBlog.author;
      blog.description = createBlog.description;
      return this.blogReponsitory.save(blog);
   }

   findAll(): Promise<Blog[]> {
      return this.blogReponsitory.find({ order: { id: 'DESC' } });
   }

   findOne(id: number): Promise<Blog> {
      return this.blogReponsitory.findOne(id);
   }

   update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
      return this.blogReponsitory.save({ id, ...updateBlogDto });
   }

   searchOne(title: string): Promise<Blog> {
      console.log(title);
      return this.blogReponsitory.findOne({ title: title });
   }

   async remove(id: number): Promise<any> {
      try {
         const book = await this.findOne(id);
         if (book) {
            await this.blogReponsitory.delete(id);
            return { message: 'ok' };
         } else {
            return { message: 'Not found id' };
         }
      } catch (error) {}
   }
}
