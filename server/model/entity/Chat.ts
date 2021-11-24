import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int')
  userId!: number;

  @Column('int')
  postId!: number;

  @Column('varchar', { nullable: true, length: 200 })
  msg!: string;

  @Column('varchar', { nullable: true, length: 200 })
  img!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => User, user => user.chats)
  user!: User;

  @ManyToOne(() => Post, post => post.chats, { onDelete: 'CASCADE' })
  post!: Post;
}
