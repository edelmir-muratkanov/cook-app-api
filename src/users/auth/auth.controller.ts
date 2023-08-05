import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() dto: LoginDto) {
		return await this.authService.login(dto)
	}

	@HttpCode(HttpStatus.OK)
	@Post('register')
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto)
	}

	@HttpCode(HttpStatus.OK)
	@Post('tokens')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return await this.authService.getNewTokens(dto)
	}
}
