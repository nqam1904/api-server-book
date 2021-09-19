import { CreateBooksDto } from './dto/create-books.dto';
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   Param,
   Post,
   Put,
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

@ApiBearerAuth('access_token')
@ApiTags('books')
@Controller('/api/books')
export class BookController {
   constructor(private bookService: BookService) {}

   @UseGuards(JwtAuthGuard)
   @UsePipes(ValidationPipe)
   @Post()
   async create(@Body() createBooksDto: CreateBooksDto) {
      return await this.bookService.create(createBooksDto);
   }

   @ApiResponse({
      status: 200,
      description: 'Get list books success!',
      type: Books,
   })
   @UseGuards(JwtAuthGuard)
   @Get()
   @HttpCode(common.API_CODE_STATUS.OK)
   findAll() {
      return this.bookService.findAll();
   }

   @UseGuards(JwtAuthGuard)
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
