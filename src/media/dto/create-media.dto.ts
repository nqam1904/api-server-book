import { Express } from 'express';
import { Readable } from 'typeorm/platform/PlatformTools';

export class CreateMediaDto implements Express.Multer.File {
  fieldname: string;
  filename: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  path: string;
  buffer: Buffer;
}
