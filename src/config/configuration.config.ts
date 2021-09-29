/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
   type: 'postgres',
   host: 'bnj8hnlrjflgc7b26sov-postgresql.services.clever-cloud.com',
   port: 5432,
   username: 'usfyqrimfphp3tiqiokr',
   password: '3uCnZtDaIGHGp7Bth2lO',
   database: 'bnj8hnlrjflgc7b26sov',
   entities: ['dist/**/*.entity{.ts,.js}'],
   synchronize: true,
};
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// export const typeOrmConfig: TypeOrmModuleOptions = {
//    type: 'postgres',
//    host: 'localhost',
//    port: 5432,
//    username: 'postgres',
//    password: '123456',
//    database: 'books',
//    entities: ['dist/**/*.entity{.ts,.js}'],
//    synchronize: true,
// };
