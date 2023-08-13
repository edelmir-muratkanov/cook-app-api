import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, ManyToOne } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Product } from './product.entity'
import { Recipe } from './recipe.entity'

export enum UNIT {
	TEASPOON = 'teaspoon',
	TABLESPOON = 'tablespoon',
	GRAM = 'gram',
	GLASS = 'glass',
}

@Entity()
@Index(['recipe.id', 'product.id'], { unique: true })
export class Ingredient extends BaseEntity {
	@ManyToOne(() => Recipe, recipe => recipe.ingredients)
	@ApiHideProperty()
	recipe: Recipe

	@ManyToOne(() => Product, product => product.ingredients)
	@ApiHideProperty()
	product: Product

	@ApiProperty({ enum: UNIT, enumName: 'Unit' })
	@Column({ type: 'enum', enum: UNIT })
	unit: UNIT

	@Column({ name: 'unit_value' })
	unitValue: number
}
