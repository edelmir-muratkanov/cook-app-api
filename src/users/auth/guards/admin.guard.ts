import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

import { User, ROLE } from 'src/shared/database/entities'

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest<{ user: User }>()
		const user = req.user

		if (user.role !== ROLE.ADMIN) {
			throw new ForbiddenException()
		}

		return user.role === ROLE.ADMIN
	}
}
