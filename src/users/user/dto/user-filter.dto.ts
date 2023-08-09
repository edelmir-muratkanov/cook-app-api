import { IsEnum, IsOptional, IsString } from 'class-validator'

import { ROLE } from 'src/shared/typeorm/entities'

export class UserFilterDto {
	@IsOptional()
	@IsString()
	username?: string

	@IsOptional()
	@IsEnum(ROLE)
	role?: ROLE
}
