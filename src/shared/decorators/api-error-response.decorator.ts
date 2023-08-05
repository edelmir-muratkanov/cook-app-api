import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

import { ErrorResponseDto } from '../dto/error-response.dto'

export const ApiErrorResponse = () =>
	applyDecorators(
		ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto }),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			type: ErrorResponseDto,
		}),
	)
