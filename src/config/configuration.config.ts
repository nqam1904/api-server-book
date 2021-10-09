/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// export const typeOrmConfig: TypeOrmModuleOptions = {
//    type: 'postgres',
//    host: 'bqrn1izp8uy0euqlbrnp-postgresql.services.clever-cloud.com',
//    port: 5432,
//    username: 'uybhtdf3st9ylwq4njgf',
//    password: 'sGGeS34rxNVdXrU5sK7w',
//    database: 'bqrn1izp8uy0euqlbrnp',
//    entities: ['dist/**/*.entity{.ts,.js}'],
//    synchronize: true,
// };
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
