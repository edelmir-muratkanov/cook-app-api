import { OmitType, PartialType } from '@nestjs/swagger'

import { CreateCuisineDto } from './create-cuisine.dto'

export class FilterCuisineDto extends PartialType(
	OmitType(CreateCuisineDto, ['description']),
) {}
