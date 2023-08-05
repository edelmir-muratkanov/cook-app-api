import { IsJWT, IsNotEmpty } from 'class-validator'

export class RefreshTokenDto {
	/** Токен полученный при регистрации или авторизации */
	@IsJWT()
	@IsNotEmpty()
	refreshToken: string
}
