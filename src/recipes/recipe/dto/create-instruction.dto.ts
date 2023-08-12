import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator'

export class CreateInstructionDto {
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	no: number

	@IsUrl()
	@IsNotEmpty()
	image: string

	@IsString()
	@IsNotEmpty()
	description: string
}
