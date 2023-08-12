import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRecipeCategoryDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	@IsString()
	description: string
}
