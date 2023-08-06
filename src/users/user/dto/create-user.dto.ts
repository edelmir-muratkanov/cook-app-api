import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({
		description: 'Электронная почта пользователя',
		default: 'admin@admin.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty({
		description: 'Имя пользователя пользователя',
		default: 'admin',
	})
	@IsString()
	@IsNotEmpty()
	username: string

	@ApiProperty({ description: 'Пароль пользователя', default: '123456' })
	@IsNotEmpty()
	@MinLength(6)
	password: string
}
