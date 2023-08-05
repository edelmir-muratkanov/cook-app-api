import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Comment } from './comment.entity'
import { Cuisine } from './cuisine.entity'
import { Ingredient } from './ingredient.entity'
import { Instruction } from './instruction.entity'
import { Rating } from './rating.entity'
import { RecipeGroup } from './recipe-group.entity'
import { User } from './user.entity'

@Entity()
export class Recipe extends BaseEntity {
	@ManyToOne(() => User, author => author.recipes)
	author: User

	@ManyToOne(() => RecipeGroup, group => group.recipes)
	group: RecipeGroup

	@ManyToOne(() => Cuisine, cuisine => cuisine.recipes)
	cuisine: Cuisine

	@Index()
	@Column()
	name: string

	@Column()
	description: string

	@Column('varchar', { array: true })
	images: string[]

	@OneToMany(() => Ingredient, ingredient => ingredient.recipe)
	ingredients: Ingredient[]

	@OneToMany(() => Instruction, instruction => instruction.recipe)
	instructions: Instruction[]

	@OneToMany(() => Comment, comment => comment.recipe)
	comments: Comment[]

	@OneToMany(() => Rating, rating => rating.recipe)
	ratings: Rating[]
}
