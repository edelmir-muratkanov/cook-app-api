import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Recipe } from './recipe.entity'
import { User } from './user.entity'

export enum REACTION {
	LIKE = 'like',
	DISLIKE = 'dislike',
}

@Entity()
export class Rating {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User, user => user.ratings)
	user: User

	@ManyToOne(() => Recipe, recipe => recipe.ratings)
	recipe: Recipe

	@Column({ type: 'enum', enum: REACTION })
	reaction: REACTION
}
