import {
   Controller,
   Get,
   Post,
   Param,
   Delete,
   UseInterceptors,
   UploadedFiles,
   UseGuards,
   HttpCode,
   HttpStatus,
   HttpException,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { common } from '../constant/CommonStatus';
import * as _ from 'lodash';
@ApiBearerAuth('access-token')
@ApiTags('media')
@Controller('/api/media')
export class MediaController {
   constructor(private readonly mediaService: MediaService) {}

   @HttpCode(common.API_CODE_STATUS.CREATED)
   @Post()
   @UseInterceptors(FilesInterceptor('files'))
   async create(@UploadedFiles() medias: CreateMediaDto[]) {
      if (_.isEmpty(medias)) throw new HttpException('Upload files faild!', HttpStatus.BAD_REQUEST);
      try {
         const data = await Promise.all(medias.map((x) => this.mediaService.create(x)));
         return {
            isSuccess: true,
            mediasId: data.map((x) => x.id),
         };
      } catch (error: any) {
         throw new Error('Upload files faild!');
      }
   }
   @HttpCode(common.API_CODE_STATUS.OK)
   @Get()
   findAll() {
      return this.mediaService.findAll();
   }

   @UseGuards(JwtAuthGuard)
   @HttpCode(common.API_CODE_STATUS.OK)
   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.mediaService.remove(+id);
   }
}
