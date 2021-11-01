import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn
} from 'typeorm';

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar', { length: 200, nullable: true })
	title!: string;

	@Column('varchar', { length: 1000, nullable: true })
	content!: string;

	@Column('int', { nullable: true })
	capacity!: number;

	@Column('datetime', { nullable: true })
	deadline!: Date;

	@Column('bool', { nullable: true })
	finished!: boolean;

	@Column('double', { nullable: true })
	lat!: number;

	@Column('double', { nullable: true })
	long!: number;

	@CreateDateColumn()
	created_at!: Date;
}
