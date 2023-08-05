import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const options = (configService: ConfigService): JwtModuleOptions => {
	const secret = configService.get<string>('JWT_SECRET')

	if (!secret) {
		throw new Error('JWT SECRET is not set')
	}

	return {
		secret,
	}
}
