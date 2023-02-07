import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import { User } from './User';
import { PostCategory } from './PostCategory';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @MaxLength(255)
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  coverMediaId: string;

  @Column('int', { default: 0 })
  views: string;

  @Column({ nullable: false, type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @Column({ nullable: false, type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => PostCategory)
  category: PostCategory;
}
