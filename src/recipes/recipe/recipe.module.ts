import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductModule } from 'src/products/product/product.module'
import {
	Ingredient,
	Instruction,
	Rating,
	Recipe,
} from 'src/shared/typeorm/entities'
import { UserModule } from 'src/users/user/user.module'

import { RecipeController } from './recipe.controller'
import { IngredientService } from './services/ingredient.service'
import { InstructionService } from './services/instruction.service'
import { RecipeService } from './services/recipe.service'
import { CuisineModule } from '../cuisine/cuisine.module'
import { GroupModule } from '../group/group.module'

@Module({
	controllers: [RecipeController],
	providers: [RecipeService, IngredientService, InstructionService],
	imports: [
		TypeOrmModule.forFeature([Recipe, Ingredient, Instruction, Rating]),
		GroupModule,
		CuisineModule,
		UserModule,
		ProductModule,
	],
})
export class RecipeModule {}
