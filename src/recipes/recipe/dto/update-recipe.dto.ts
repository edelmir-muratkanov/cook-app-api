import { PartialType } from '@nestjs/mapped-types'
import { OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsOptional,
	ValidateNested,
} from 'class-validator'

import { CreateRecipeDto } from './create-recipe.dto'
import { UpdateIngredientDto } from './update-ingredient.dto'
import { UpdateInstructionDto } from './update-instruction.dto'

export class UpdateRecipeDto extends PartialType(
	OmitType(CreateRecipeDto, [
		'cuisineId',
		'groupId',
		'ingredients',
		'instructions',
	]),
) {
	@IsArray()
	@IsOptional()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => UpdateIngredientDto)
	ingredients: UpdateIngredientDto[]

	@IsArray()
	@IsOptional()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => UpdateInstructionDto)
	instructions: UpdateInstructionDto[]
}
