/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsEmail, IsPhoneNumber } from 'class-validator';
import {
   BeforeInsert,
   BeforeUpdate,
   Column,
   CreateDateColumn,
   Entity,
   Index,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   firstName: string = '';

   @Column()
   lastName: string = '';

   @Column({ default: true })
   isActive: boolean = true;

   @Column()
   @IsPhoneNumber('VN')
   phone: string = '';

   @Column()
   password: string = '';

   @Column({ unique: true })
   @IsEmail()
   @Index()
   email: string = '';

   @CreateDateColumn()
   createDate: Date;

   @UpdateDateColumn()
   writeDate: Date;
}
