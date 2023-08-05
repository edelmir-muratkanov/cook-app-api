import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { AdminGuard, JwtGuard } from 'src/users/auth/guards'

import { ROLE } from '../providers/typeorm/entities'

export const Auth = (role = ROLE.GUEST) =>
	applyDecorators(
		ApiBearerAuth(),
		ApiUnauthorizedResponse(),
		role === ROLE.ADMIN ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard),
	)
