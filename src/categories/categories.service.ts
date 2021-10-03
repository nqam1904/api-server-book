import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
   constructor(
      @InjectRepository(Category)
      private readonly categoriesRepository: Repository<Category>,
   ) {}

   async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
      const category = new Category();
      category.name = createCategoryDto.name;
      return this.categoriesRepository.save(category);
   }
   findAll(): Promise<Category[]> {
      return this.categoriesRepository.find({ order: { id: 'DESC' } });
   }

   findOne(id: number): Promise<Category> {
      return this.categoriesRepository.findOne(id);
   }

   update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
      return this.categoriesRepository.save({
         id,
         ...updateCategoryDto,
      });
   }

   async remove(id: number): Promise<any> {
      try {
         const cate = await this.findOne(id);
         if (cate) {
            await this.categoriesRepository.delete(id);
            return { message: 'ok' };
         } else {
            return { message: 'Not found id' };
         }
      } catch (error) {}

      //   return await this.deleteChildrenNode(
      //      await this.categoriesRepository.findDescendantsTree(cate),
      //   );
   }

   //    async deleteChildrenNode(cate: Category): Promise<void> {
   //       if (cate.children.length > 0) {
   //          await Promise.all(cate.children.map((x) => this.deleteChildrenNode(x)));
   //       }
   //       await this.categoriesRepository.remove(cate);
   //    }
}
