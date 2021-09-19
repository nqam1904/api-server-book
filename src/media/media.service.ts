import { Media } from './entities/media.entity';
import { Injectable } from '@nestjs/common';
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

  // update(id: number, updateMediaDto: UpdateMediaDto) {
  //   return `This action updates a #${id} media`;
  // }

  async remove(id: number): Promise<void> {
    await this.mediaRepository.remove(await this.findOne(id));
  }
}
