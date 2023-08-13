import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateCommentDto {
	@IsUUID()
	@IsOptional()
	parentId?: string

	@IsString()
	@IsNotEmpty()
	text: string
}
