import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { ApiErrorResponse } from 'src/shared/decorators/api-error-response.decorator'
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto'

import { AuthService } from './auth.service'
import { AuthResponse } from './dto/auth-response.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiResponse({ status: HttpStatus.OK, type: AuthResponse })
	@ApiErrorResponse()
	@ApiUnauthorizedResponse({ type: ErrorResponseDto })
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() dto: LoginDto) {
		return await this.authService.login(dto)
	}

	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({ status: HttpStatus.OK, type: AuthResponse })
	@ApiErrorResponse()
	@ApiUnauthorizedResponse({ type: ErrorResponseDto })
	@HttpCode(HttpStatus.OK)
	@Post('register')
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto)
	}

	@ApiOperation({ summary: 'Получение новой пары токенов' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: HttpStatus.OK, type: AuthResponse })
	@ApiErrorResponse()
	@ApiUnauthorizedResponse({ type: ErrorResponseDto })
	@Post('tokens')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return await this.authService.getNewTokens(dto)
	}
}
