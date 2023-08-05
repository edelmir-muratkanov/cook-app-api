import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Recipe } from './recipe.entity'

@Entity()
export class Instruction extends BaseEntity {
	@ManyToOne(() => Recipe, recipe => recipe.instructions)
	recipe: Recipe

	@Column({ default: 1 })
	no: number

	@Column()
	image: string

	@Column()
	description: string
}
