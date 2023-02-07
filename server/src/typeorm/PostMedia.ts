import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsIn } from 'class-validator';
import { Post } from './Post';

@Entity()
export class PostMedia {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @IsIn(['photo', 'video'])
  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  src: string;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: false, type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @Column({ nullable: false, type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => Post)
  post: Post;
}
