import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { Texture } from './Texture';
import { Element } from './Element';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, default: 'GRID' })
  template: string;

  @ManyToOne(() => Texture)
  texture: Texture;

  @ManyToOne(() => User)
  user: User;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
