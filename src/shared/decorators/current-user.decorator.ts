import { ExecutionContext, createParamDecorator } from '@nestjs/common'

import { User } from '../typeorm/entities'

export const CurrentUser = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest<{ user: User }>()
		const user = req.user

		return data ? user[data] : user
	},
)
