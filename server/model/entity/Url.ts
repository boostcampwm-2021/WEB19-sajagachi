import { PrimaryColumn, Entity, ManyToOne } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Url {
  @PrimaryColumn('int')
  postId!: number;

  @PrimaryColumn('varchar', { length: 1000 })
  url!: string;

  @ManyToOne(() => Post, post => post.urls, { onDelete: 'CASCADE' })
  post!: Post;
}
