import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';
import { User } from './User';
import { Participant } from './Participant';
import { Category } from './Category';
import { Chat } from './Chat';
import { Url } from './Url';
import { WishList } from './WishList';

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('int')
	userId!: number;

	@Column('int')
	categoryId!: number;

	@Column('varchar', { length: 200, nullable: true })
	title!: string;

	@Column('varchar', { length: 1000, nullable: true })
	content!: string;

	@Column('int', { nullable: true })
	capacity!: number;

	@Column('datetime', { nullable: true })
	deadline!: Date;

	@Column('bool', { default: false })
	finished!: boolean;

	@Column('double', { nullable: true })
	lat!: number;

	@Column('double', { nullable: true })
	long!: number;

	@CreateDateColumn()
	created_at!: Date;

	@ManyToOne(() => User, user => user.posts)
	user!: User;

	@OneToMany(() => WishList, _wishList => _wishList.post)
	wishList!: WishList[];

	@OneToMany(type => Participant, _participant => _participant.post)
	participant!: Participant[];

	@OneToMany(() => Chat, chat => chat.post)
	chats!: Chat[];

	@ManyToOne(() => Category, category => category.posts)
	category!: Category;

	@OneToMany(() => Url, url => url.post)
	urls!: Url[];
}
