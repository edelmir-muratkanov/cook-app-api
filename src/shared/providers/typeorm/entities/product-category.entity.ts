import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Product } from './product.entity'

@Entity({ name: 'product_category' })
export class ProductCategory extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column()
	image: string

	@OneToMany(() => Product, product => product.category)
	products: Product[]
}
