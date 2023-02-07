import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsIn } from 'class-validator';
import { Post } from './Post';

@Entity()
export class PostAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @IsIn(['place'])
  @Column({ nullable: false })
  type: string;

  @ManyToOne(() => Post)
  post: Post;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @Column({ nullable: false, type: 'timestamp', name: 'update_at' })
  updateAt: Date;
}
