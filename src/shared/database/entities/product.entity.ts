import { ApiHideProperty } from '@nestjs/swagger'
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Ingredient } from './ingredient.entity'
import { ProductCategory } from './product-category.entity'

@Entity()
export class Product extends BaseEntity {
	@ManyToOne(() => ProductCategory, category => category.products)
	@ApiHideProperty()
	category: ProductCategory

	@Index()
	@Column({ unique: true })
	name: string

	@Column()
	image: string

	@Column()
	description: string

	@OneToMany(() => Ingredient, ingredient => ingredient.product)
	ingredients: Ingredient[]
}
