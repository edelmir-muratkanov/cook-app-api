import { User } from 'src/shared/providers/typeorm/entities'

export class AuthResponse {
	user: User
	tokens: {
		accessToken: string
		refreshToken: string
	}
}
