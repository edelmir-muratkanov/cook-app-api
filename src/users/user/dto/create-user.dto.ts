import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	username: string

	@IsNotEmpty()
	@Min(6)
	password: string
}
