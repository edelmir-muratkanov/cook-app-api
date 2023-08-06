import { ApiProperty } from '@nestjs/swagger'

import { Exception } from './exception.dto'

export class ErrorResponseDto {
	@ApiProperty()
	statusCode: number

	@ApiProperty()
	timestamp: string

	@ApiProperty()
	path: string

	@ApiProperty()
	params: any

	@ApiProperty()
	query: any

	@ApiProperty()
	exception: Exception
}
