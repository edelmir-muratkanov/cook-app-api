import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsString,
	IsUUID,
	IsUrl,
	ValidateNested,
} from 'class-validator'

import { CreateIngredientDto } from './create-ingredient.dto'
import { CreateInstructionDto } from './create-instruction.dto'

export class CreateRecipeDto {
	@IsUUID()
	@IsNotEmpty()
	groupId: string

	@IsUUID()
	@IsNotEmpty()
	cuisineId: string

	@IsString()
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	@IsString()
	description: string

	@IsArray()
	@IsUrl({}, { each: true })
	images: string[]

	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateIngredientDto)
	ingredients: CreateIngredientDto[]

	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateInstructionDto)
	instructions: CreateInstructionDto[]
}
