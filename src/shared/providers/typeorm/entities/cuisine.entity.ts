import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Recipe } from './recipe.entity'

@Entity({ name: 'recipe_cuisine' })
export class Cuisine extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column()
	description: string

	@OneToMany(() => Recipe, recipe => recipe.cuisine)
	recipes: Recipe[]
}
