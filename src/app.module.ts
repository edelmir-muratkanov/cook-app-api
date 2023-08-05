import { Module } from '@nestjs/common'

import { CommentModule } from './feedback/comment/comment.module'
import { RatingModule } from './feedback/rating/rating.module'
import { CategoryModule as ProductCategoryModule } from './products/category/category.module'
import { IngredientModule } from './products/ingredient/ingredient.module'
import { ProductModule } from './products/product/product.module'
import { CategoryModule } from './recipes/category/category.module'
import { CuisineModule } from './recipes/cuisine/cuisine.module'
import { GroupModule } from './recipes/group/group.module'
import { RecipeModule } from './recipes/recipe/recipe.module'
import { AuthModule } from './users/auth/auth.module'
import { UserModule } from './users/user/user.module'

@Module({
	imports: [
		AuthModule,
		UserModule,
		RatingModule,
		CommentModule,
		RecipeModule,
		ProductCategoryModule,
		CategoryModule,
		GroupModule,
		CuisineModule,
		ProductModule,
		IngredientModule,
	],
})
export class AppModule {}
