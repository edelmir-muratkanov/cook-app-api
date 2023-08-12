import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

import { UNIT } from 'src/shared/typeorm/entities'

export class CreateIngredientDto {
	@IsUUID()
	@IsNotEmpty()
	productId: string

	@IsEnum(UNIT)
	unit: UNIT

	@IsNumber()
	@IsNotEmpty()
	unitValue: number
}
