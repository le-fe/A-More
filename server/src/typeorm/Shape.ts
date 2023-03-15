import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shape {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  keyword: string;

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
