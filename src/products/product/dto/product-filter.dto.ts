import { IsOptional, IsString, IsUUID } from 'class-validator'

export class ProductFilterDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsUUID()
	@IsOptional()
	categoryId?: string
}
