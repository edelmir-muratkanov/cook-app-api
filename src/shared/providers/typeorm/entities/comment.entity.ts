import {
	Column,
	Entity,
	ManyToOne,
	Tree,
	TreeChildren,
	TreeParent,
} from 'typeorm'

import { BaseEntity } from './base.entity'
import { Recipe } from './recipe.entity'
import { User } from './user.entity'

@Entity()
@Tree('closure-table')
export class Comment extends BaseEntity {
	@ManyToOne(() => User, user => user.comments)
	user: User

	@ManyToOne(() => Recipe, recipe => recipe.comments)
	recipe: Recipe

	@Column()
	text: string

	@TreeParent()
	parent: Comment

	@TreeChildren()
	children: Comment[]
}
