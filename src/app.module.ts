import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CommentModule } from './feedback/comment/comment.module'
import { RatingModule } from './feedback/rating/rating.module'
import { CategoryModule as ProductCategoryModule } from './products/category/category.module'
import { IngredientModule } from './products/ingredient/ingredient.module'
import { ProductModule } from './products/product/product.module'
import { CategoryModule as RecipeCategoryModule } from './recipes/category/category.module'
import { CuisineModule } from './recipes/cuisine/cuisine.module'
import { GroupModule } from './recipes/group/group.module'
import { RecipeModule } from './recipes/recipe/recipe.module'
import { ProvidersModule } from './shared/providers/providers.module'
import { AuthModule } from './users/auth/auth.module'
import { UserModule } from './users/user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ProvidersModule,

		AuthModule,
		UserModule,

		RatingModule,
		CommentModule,

		ProductCategoryModule,
		IngredientModule,
		ProductModule,

		RecipeModule,
		RecipeCategoryModule,
		GroupModule,
		CuisineModule,
	],
})
export class AppModule {}
