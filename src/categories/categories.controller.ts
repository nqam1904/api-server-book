/* eslint-disable prettier/prettier */
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { common } from '../constant/CommonStatus';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiBearerAuth('access_token')
@ApiTags('categories')
@Controller('/api/categories')
export class CategoriesController {
   constructor(private categoriesService: CategoriesService) {}

   @UseGuards(JwtAuthGuard)
   @Post()
   async create(@Body() createCategoryDto: CreateCategoryDto) {
      return await this.categoriesService.create(createCategoryDto);
   }

   @ApiResponse({
      status: 200,
      description: 'Get list category success!',
      type: Category,
   })
   @Get()
   @HttpCode(common.API_CODE_STATUS.OK)
   findAll() {
      return this.categoriesService.findAll();
   }

   @Get(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   findOne(@Param('id') id: string) {
      return this.categoriesService.findOne(+id);
   }

   @UseGuards(JwtAuthGuard)
   @Put(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
      return this.categoriesService.update(+id, updateCategoryDto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   async remove(@Param('id') id: string) {
      await this.categoriesService.remove(+id);
      return {
         isSuccess: true,
         messsage: 'ok',
      };
   }
}
