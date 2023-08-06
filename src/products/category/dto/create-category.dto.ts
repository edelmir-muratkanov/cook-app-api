import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class CreateCategoryDto {
	/** Название категории */
	@IsString()
	@IsNotEmpty()
	name: string

	/** Обложка категории */
	@IsUrl()
	@IsNotEmpty()
	image: string
}
