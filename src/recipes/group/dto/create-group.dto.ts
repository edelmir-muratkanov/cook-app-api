import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateGroupDto {
	@IsUUID()
	@IsNotEmpty()
	categoryId: string

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	description: string
}
