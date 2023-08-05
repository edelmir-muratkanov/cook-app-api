import { Module } from '@nestjs/common'

import { CategoryModule } from './category/category.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { ProductModule } from './product/product.module'

@Module({
	imports: [CategoryModule, IngredientModule, ProductModule],
})
export class ProductsModule {}
