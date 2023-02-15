import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TextureTag {
  @PrimaryColumn('varchar', { length: 100 })
  uid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true, name: 'img_url' })
  imgUrl: string;

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
