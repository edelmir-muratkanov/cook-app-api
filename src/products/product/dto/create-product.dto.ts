import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator'

export class CreateProductDto {
	@IsUUID()
	@IsNotEmpty()
	categoryId: string

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsUrl()
	@IsNotEmpty()
	image: string
}
