import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from './Board';
import { Element } from './Element';

@Entity()
export class BoardElementItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Board)
  board: Board;

  @ManyToOne(() => Element)
  element: Element;

  @Column()
  title: string;

  @Column()
  content: string;

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
