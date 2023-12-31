import { Column, Entity, Index, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { RecipeGroup } from './recipe-group.entity'

@Entity({ name: 'recipe_category' })
export class RecipeCategory extends BaseEntity {
	@Index()
	@Column({ unique: true })
	name: string

	@Column()
	description: string

	@OneToMany(() => RecipeGroup, group => group.category)
	groups: RecipeGroup[]
}
