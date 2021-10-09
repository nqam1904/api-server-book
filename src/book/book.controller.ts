import { CreateBooksDto } from './dto/create-books.dto';
import {
   Body,
   Controller,
   DefaultValuePipe,
   Delete,
   Get,
   HttpCode,
   Param,
   ParseIntPipe,
   Post,
   Put,
   Query,
   UseGuards,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { common } from '../constant/CommonStatus';
import { BookService } from './book.service';
import { Books } from './entities/books.entity';
import { UpdateBooksDto } from './dto/update-books.dto';
import { CategoriesService } from '../categories/categories.service';
import { MediaService } from '../media/media.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiBearerAuth('access_token')
@ApiTags('books')
@Controller('/api/books')
export class BookController {
   constructor(
      private bookService: BookService,
      private mediaService: MediaService,
      private categoriesService: CategoriesService,
   ) {}

   @UsePipes(ValidationPipe)
   @Post()
   async create(@Body() createBooksDto: CreateBooksDto) {
      // add imagesId to table Media
      const images = await Promise.all(
         createBooksDto.imagesId.map(async (x) => {
            return this.mediaService.findOne(x);
         }),
      );
      createBooksDto.images = images;
      // add  categoriesId to table Category
      createBooksDto.categories = await Promise.all(
         createBooksDto.categoriesId.map(async (x) => {
            return await this.categoriesService.findOne(x);
         }),
      );
      const data = await this.bookService.create(createBooksDto);
      return {
         data: data,
      };
   }

   @ApiResponse({
      status: 200,
      description: 'Get list books success!',
      type: Books,
   })
   @Get()
   @HttpCode(common.API_CODE_STATUS.OK)
   // findAll() {
   //    return this.bookService.findAll();
   // }
   findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
   ): Promise<Pagination<Books>> {
      limit = limit > 100 ? 100 : limit;
      return this.bookService.paginate({
         page,
         limit,
      });
   }

   @Get(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   findOne(@Param('id') id: string) {
      return this.bookService.findOne(+id);
   }

   @UseGuards(JwtAuthGuard)
   @UsePipes(ValidationPipe)
   @Put(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   update(@Param('id') id: string, @Body() updateBooksDto: UpdateBooksDto) {
      return this.bookService.update(+id, updateBooksDto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   async remove(@Param('id') id: string) {
      await this.bookService.remove(+id);
      return {
         isSuccess: true,
         messsage: 'ok',
      };
   }
}
