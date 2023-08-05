import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FeedbackModule } from './feedback/feedback.module'
import { CategoryModule as ProductCategoryModule } from './products/category/category.module'
import { IngredientModule } from './products/ingredient/ingredient.module'
import { ProductModule } from './products/product/product.module'
import { CategoryModule as RecipeCategoryModule } from './recipes/category/category.module'
import { CuisineModule } from './recipes/cuisine/cuisine.module'
import { GroupModule } from './recipes/group/group.module'
import { RecipeModule } from './recipes/recipe/recipe.module'
import { ProvidersModule } from './shared/providers/providers.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ProvidersModule,

		ProductCategoryModule,
		IngredientModule,
		ProductModule,

		RecipeModule,
		RecipeCategoryModule,
		GroupModule,
		CuisineModule,
		FeedbackModule,
		UsersModule,
	],
})
export class AppModule {}
