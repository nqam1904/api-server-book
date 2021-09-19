import {
   AfterLoad,
   AfterRemove,
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Entity()
export class Media {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   key: string;

   @Column()
   size: number;

   @Column()
   type: string;

   @Column()
   name: string;

   @CreateDateColumn()
   createDate: Date;

   @UpdateDateColumn()
   writeDate: Date;

   @AfterRemove()
   removeFileOnDisk() {
      unlinkSync(join(__dirname, '..', '..', '..', '..', 'uploads', this.key));
   }
}
