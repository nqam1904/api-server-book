import {
   BaseEntity,
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
   BeforeRemove,
   getConnection,
   ManyToMany,
   JoinTable,
} from 'typeorm';
import { Media } from '../../media/entities/media.entity';

@Entity()
export class Category extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @CreateDateColumn()
   createDate: Date;

   @ManyToMany(() => Media, { eager: true, cascade: true })
   @JoinTable()
   images: Media[] = null;

   @UpdateDateColumn()
   writeDate: Date;

   @BeforeRemove()
   async deleteChildren() {
      await getConnection().query(
         `DELETE FROM category WHERE id_ancestor = ${this.id} OR id_descendant = ${this.id}`,
      );
   }
}
