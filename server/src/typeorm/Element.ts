import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Element {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  src: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  tags: string;

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
