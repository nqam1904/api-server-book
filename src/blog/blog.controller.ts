import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   Param,
   Post,
   Put,
   Query,
   UseGuards,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from '../categories/categories.service';
import { common } from '../constant/CommonStatus';
import { MediaService } from '../media/media.service';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@ApiBearerAuth('access_token')
@ApiTags('blog')
@Controller('/api/blog')
export class BlogController {
   constructor(
      private blogService: BlogService,
      private mediaService: MediaService,
      private categoriesService: CategoriesService,
   ) {}

   @UseGuards(JwtAuthGuard)
   @UsePipes(ValidationPipe)
   @Post()
   async create(@Body() createBlogDto: CreateBlogDto) {
      // add imagesId to table Media
      const images = await Promise.all(
         createBlogDto.imagesId.map(async (x) => {
            return this.mediaService.findOne(x);
         }),
      );
      createBlogDto.images = images;
      // add  categoriesId to table Category
      createBlogDto.categories = await Promise.all(
         createBlogDto.categoriesId.map(async (x) => {
            return await this.categoriesService.findOne(x);
         }),
      );
      const data = await this.blogService.create(createBlogDto);
      return {
         data: data,
      };
   }

   @ApiResponse({
      status: 200,
      description: 'Get list books success!',
      type: Blog,
   })
   @Get()
   @HttpCode(common.API_CODE_STATUS.OK)
   findAll() {
      return this.blogService.findAll();
   }

   @Get(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   findOne(@Param('id') id: string) {
      return this.blogService.findOne(+id);
   }

   @Get()
   @HttpCode(common.API_CODE_STATUS.OK)
   searchOne(@Query('title') title: string) {
      console.log(title);
      return this.blogService.searchOne(title);
   }

   @UseGuards(JwtAuthGuard)
   @UsePipes(ValidationPipe)
   @Put(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
      return this.blogService.update(+id, updateBlogDto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   async remove(@Param('id') id: string) {
      await this.blogService.remove(+id);
      return {
         isSuccess: true,
         messsage: 'ok',
      };
   }
}
