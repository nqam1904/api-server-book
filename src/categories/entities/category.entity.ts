import {
   BaseEntity,
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
   BeforeRemove,
   getConnection,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @CreateDateColumn()
   createDate: Date;

   @UpdateDateColumn()
   writeDate: Date;

   @BeforeRemove()
   async deleteChildren() {
      await getConnection().query(
         `DELETE FROM category WHERE id_ancestor = ${this.id} OR id_descendant = ${this.id}`,
      );
   }
}
