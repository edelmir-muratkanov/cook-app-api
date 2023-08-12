import { PartialType } from '@nestjs/swagger'

import { CreateRecipeCategoryDto } from './create-category.dto'

export class UpdateRecipeCategoryDto extends PartialType(
	CreateRecipeCategoryDto,
) {}
