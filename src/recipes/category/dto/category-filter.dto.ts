import { IsOptional, IsString } from 'class-validator'

export class RecipeCategoryFilterDto {
	@IsString()
	@IsOptional()
	name?: string
}
