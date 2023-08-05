import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Ingredient } from './ingredient.entity'
import { ProductCategory } from './product-category.entity'

@Entity()
export class Product extends BaseEntity {
	@ManyToOne(() => ProductCategory, category => category.products)
	category: ProductCategory

	@Column({ unique: true })
	name: string

	@Column()
	image: string

	@Column()
	description: string

	@OneToMany(() => Ingredient, ingredient => ingredient.product)
	ingredients: Ingredient[]
}
