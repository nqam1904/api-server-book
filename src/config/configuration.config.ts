/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: '123456',
   database: 'books',
   entities: ['dist/**/*.entity{.ts,.js}'],
   synchronize: true,
};
