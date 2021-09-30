import { Media } from './entities/media.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
   constructor(
      @InjectRepository(Media)
      private readonly mediaRepository: Repository<Media>,
   ) {}

   async create(createMediaDto: CreateMediaDto): Promise<Media> {
      console.log(createMediaDto, 'file');
      const media = new Media();
      media.key = createMediaDto.filename;
      media.name = createMediaDto.originalname;
      media.size = createMediaDto.size;
      media.type = createMediaDto.mimetype;
      return this.mediaRepository.save(media);
   }

   findAll(): Promise<Media[]> {
      return this.mediaRepository.find();
   }

   findOne(id: number): Promise<Media> {
      return this.mediaRepository.findOne(id);
   }

   async remove(id: number): Promise<any> {
      try {
         const idUser = await this.mediaRepository.remove(await this.findOne(id));
         if (idUser) {
            await this.mediaRepository.delete(id);
            return { isSuccess: true, messsage: 'ok' };
         } else {
            throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
         }
      } catch (error) {
         throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
      }
   }
}
