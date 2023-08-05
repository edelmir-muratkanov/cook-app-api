import {
	Column,
	Entity,
	Index,
	JoinTable,
	ManyToMany,
	OneToMany,
} from 'typeorm'

import { BaseEntity } from './base.entity'
import { Comment } from './comment.entity'
import { Rating } from './rating.entity'
import { Recipe } from './recipe.entity'

enum ROLE {
	GUEST = 'guest',
	ADMIN = 'admin',
}

@Entity()
export class User extends BaseEntity {
	@Index()
	@Column({ unique: true })
	email: string

	@Index()
	@Column({ unique: true })
	username: string

	@Column()
	password: string

	@Column({ type: 'enum', enum: ROLE, default: ROLE.GUEST })
	role: ROLE

	@ManyToMany(() => User, user => user.following)
	@JoinTable({ name: 'subsription' })
	followers: User[]

	@ManyToMany(() => User, user => user.followers)
	following: User[]

	@OneToMany(() => Recipe, recipe => recipe.author)
	recipes: Recipe[]

	@OneToMany(() => Comment, comment => comment.user)
	comments: Comment[]

	@OneToMany(() => Rating, rating => rating.user)
	ratings: Rating
}
