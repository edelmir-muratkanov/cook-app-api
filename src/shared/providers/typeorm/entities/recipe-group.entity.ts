import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { RecipeCategory } from './recipe-category.entity'
import { Recipe } from './recipe.entity'

@Entity({ name: 'recipe_group' })
export class RecipeGroup extends BaseEntity {
	@ManyToOne(() => RecipeCategory, category => category.groups)
	category: RecipeCategory

	@Index()
	@Column({ unique: true })
	name: string

	@Column()
	description: string

	@OneToMany(() => Recipe, recipe => recipe.group)
	recipes: Recipe[]
}
