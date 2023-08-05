import { UseGuards, applyDecorators } from '@nestjs/common'

import { AdminGuard, JwtGuard } from 'src/users/auth/guards'

import { ROLE } from '../providers/typeorm/entities'

export const Auth = (role = ROLE.GUEST) =>
	applyDecorators(
		role === ROLE.ADMIN ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard),
	)
