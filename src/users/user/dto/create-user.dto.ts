import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
	/** Электронная почта пользователя */
	@IsEmail()
	@IsNotEmpty()
	email: string

	/** Имя пользователя пользователя */
	@IsString()
	@IsNotEmpty()
	username: string

	/** Пароль пользователя */
	@IsNotEmpty()
	@MinLength(6)
	password: string
}
