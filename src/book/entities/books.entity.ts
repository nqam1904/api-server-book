import {
   BaseEntity,
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
   BeforeRemove,
   getConnection,
   JoinTable,
   ManyToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Media } from '../../media/entities/media.entity';

@Entity()
export class Books extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string;

   @Column()
   author: string;

   @CreateDateColumn()
   createDate: Date;

   @ManyToMany(() => Media, { eager: true, cascade: true })
   @JoinTable()
   images: Media[] = null;

   @ManyToMany(() => Category, { cascade: ['insert', 'update'], eager: true })
   @JoinTable()
   categories: Category[] = null;

   @UpdateDateColumn()
   writeDate: Date;

   @BeforeRemove()
   async deleteChildren() {
      await getConnection().query(
         `DELETE FROM category WHERE id_ancestor = ${this.id} OR id_descendant = ${this.id}`,
      );
   }
}
