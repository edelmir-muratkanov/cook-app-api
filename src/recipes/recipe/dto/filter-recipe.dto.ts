import { IsOptional, IsString, IsUUID } from 'class-validator'

export class FilterRecipeDto {
	@IsUUID()
	@IsOptional()
	authorId?: string

	@IsUUID()
	@IsOptional()
	groupId?: string

	@IsUUID()
	@IsOptional()
	cuisineId?: string

	@IsUUID()
	@IsOptional()
	productId?: string

	@IsString()
	@IsOptional()
	name?: string
}
