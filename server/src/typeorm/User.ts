import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, name: 'img_url' })
  imgUrl: string;

  @Column({ nullable: false, type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @Column({ nullable: false, type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @Column({ nullable: true })
  role: string;

  // @OneToMany(() => Post, (post) => post.user)
  // posts: Post[];
}
