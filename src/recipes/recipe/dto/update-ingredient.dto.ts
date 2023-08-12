import { OmitType, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

import { CreateIngredientDto } from './create-ingredient.dto'

export class UpdateIngredientDto extends PartialType(
	OmitType(CreateIngredientDto, ['productId']),
) {
	@IsUUID()
	@IsNotEmpty()
	id: string
}
