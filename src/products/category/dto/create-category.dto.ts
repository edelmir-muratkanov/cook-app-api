import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class CreateProductCategoryDto {
	@ApiProperty({ description: 'Название категории', example: 'Алкоголь' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		description: 'Изображение категории',
		example: 'http://localhost:5000/media/SOME_PHOTO.jpg',
	})
	@IsUrl()
	@IsNotEmpty()
	image: string
}
