import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { options } from './auth.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { STRATEGIES } from './strategy'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: options,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, ...STRATEGIES],
})
export class AuthModule {}
