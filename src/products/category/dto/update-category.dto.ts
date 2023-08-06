import { PartialType } from '@nestjs/swagger'

import { CreateProductCategoryDto } from './create-category.dto'

export class UpdateProductCategoryDto extends PartialType(
	CreateProductCategoryDto,
) {}
