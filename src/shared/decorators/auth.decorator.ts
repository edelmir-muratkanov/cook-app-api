import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { AdminGuard, JwtGuard } from 'src/users/auth/guards'

import { ROLE } from '../database/entities'
import { ErrorResponseDto } from '../dto/error-response.dto'

export const Auth = (role = ROLE.GUEST) =>
	applyDecorators(
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ type: ErrorResponseDto }),
		role === ROLE.ADMIN ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard),
	)
