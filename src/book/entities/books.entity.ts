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
export class Books extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string;

   @Column()
   author: string;

   @CreateDateColumn()
   createDate: Date;

   @UpdateDateColumn()
   writeDate: Date;

   //    @BeforeRemove()
   //    async deleteChildren() {
   //       await getConnection().query(
   //          `DELETE FROM category WHERE id_ancestor = ${this.id} OR id_descendant = ${this.id}`,
   //       );
   //    }
}
