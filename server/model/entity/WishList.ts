import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class WishList {
	@PrimaryColumn('int')
	userId!: number;

	@PrimaryColumn('int')
	postId!: number;

	@ManyToOne(() => User, _user => _user.wishList)
	user!: User;

	@ManyToOne(() => Post, _post => _post.wishList)
	post!: Post;
}
