import { Media } from './entities/media.entity';
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const MulterDiskModule = MulterModule.registerAsync({
   imports: [ConfigModule],
   useFactory: async (configService: ConfigService) => ({
      storage: diskStorage({
         destination: join(__dirname, '../../uploads'),
         filename: (req, file, callback) => {
            const ext = extname(file.originalname).toLowerCase();
            callback(null, Date.now() + ext);
         },
      }),
      fileFilter: (req, file, callback) => {
         const ext = extname(file.originalname).toLowerCase();
         if (!['.jpg', '.png', '.mp4', '.jpeg', '.pdf'].includes(ext)) {
            return callback(new Error('Only media files are allowed'), false);
         }
         callback(null, true);
      },
   }),
   inject: [ConfigService],
});
@Module({
   imports: [TypeOrmModule.forFeature([Media]), MulterDiskModule],
   controllers: [MediaController],
   providers: [MediaService],
   exports: [MediaService, MulterDiskModule],
})
export class MediaModule {}
