import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { PaginatedDto } from '../dto/paginated.dto'

export const ApiPaginatedResponse = <TModel extends Type<any>>(
	model: TModel,
) => {
	return applyDecorators(
		ApiExtraModels(model),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(PaginatedDto) },
					{
						properties: {
							count: {
								type: 'number',
							},
							data: {
								type: 'array',
								items: { $ref: getSchemaPath(model) },
							},
						},
					},
				],
			},
		}),
	)
}
