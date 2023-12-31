import { PickType } from '@nestjs/swagger'

import { User } from 'src/shared/database/entities'

class AuthUser extends PickType(User, ['id', 'email', 'role']) {}

export class AuthResponse {
	user: AuthUser
	tokens: {
		accessToken: string
		refreshToken: string
	}
}
