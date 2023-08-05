import { Module } from '@nestjs/common'

import { CommentModule } from './feedback/comment/comment.module'
import { RatingModule } from './feedback/rating/rating.module'
import { CategoryModule as ProductCategoryModule } from './product/category/category.module'
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
	],
})
export class AppModule {}
