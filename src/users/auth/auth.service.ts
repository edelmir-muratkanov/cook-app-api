import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { User } from 'src/shared/providers/typeorm/entities'

import { Payload } from './auth.interface'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async login(dto: LoginDto) {
		const user = await this.userService.byEmail(dto.email)
		if (!user) {
			throw new UnauthorizedException('Invalid creadentials')
		}

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid creadentials')
		}

		const tokens = await this.issueTokenPair(user)

		return { user, tokens }
	}

	async register(dto: CreateUserDto) {
		const user = await this.userService.create(dto)
		const tokens = await this.issueTokenPair(user)

		return { user, tokens }
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		const result = await this.jwtService.verifyAsync<Payload>(refreshToken)
		if (!result) {
			throw new UnauthorizedException()
		}
		const user = await this.userService.byId(result.id)
		if (!user) {
			throw new UnauthorizedException()
		}
		const tokens = await this.issueTokenPair(user)

		return { tokens, user }
	}

	private async issueTokenPair(user: User) {
		const payload: Payload = {
			id: user.id,
			email: user.email,
			role: user.role,
		}
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
		})

		return { accessToken, refreshToken }
	}
}
