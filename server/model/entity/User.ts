import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Chat } from './Chat';
import { Post } from './Post';
import { Participant } from './Participant';
import { WishList } from './WishList';

@Entity()
export class User {
	@PrimaryColumn('int')
	id!: number;

	@Column('varchar', { length: 255 })
	name!: string;

	@Column('varchar', { length: 255 })
	img!: string;

	@Column('int', { default: 0 })
	point: number = 0;

	@OneToMany(() => Post, post => post.user)
	posts!: Post[];

	@OneToMany(() => Participant, _participant => _participant.user)
	participant!: Participant[];

	@OneToMany(() => WishList, _wishList => _wishList.user)
	wishList!: WishList[];

	@OneToMany(() => Chat, chat => chat.user)
	chats!: Chat[];
}
