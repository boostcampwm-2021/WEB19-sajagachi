import { PrimaryColumn, Entity, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Url {
	@PrimaryColumn('int')
	postId!: number;

	@Column('varchar', { length: 200 })
	url!: string;

	@ManyToOne(() => Post, post => post.urls)
	post!: Post;
}
