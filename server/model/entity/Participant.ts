import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Participant {
	@PrimaryColumn('int')
	userId!: number;

	@PrimaryColumn('int')
	postId!: number;

	@ManyToOne(() => Post, _post => _post.participant, { onDelete: 'CASCADE' })
	post!: Post;

	@ManyToOne(() => User, _user => _user.participant)
	user!: User;

	@Column('int', { nullable: true })
	point!: number | null;
}
