import { Module } from '@nestjs/common'

import { CategoryModule } from './category/category.module'
import { CuisineModule } from './cuisine/cuisine.module'
import { GroupModule } from './group/group.module'
import { RecipeModule } from './recipe/recipe.module'

@Module({
	imports: [CategoryModule, CuisineModule, GroupModule, RecipeModule],
})
export class RecipesModule {}
