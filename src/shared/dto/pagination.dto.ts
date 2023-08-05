import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDto {
	@IsOptional()
	@Min(0)
	@IsNumber({ allowInfinity: false, allowNaN: false })
	offset = 0

	@IsOptional()
	@IsNumber({ allowInfinity: false, allowNaN: false })
	@IsPositive()
	limit = 15
}

export class PaginatedDto<T> {
	data: T[]
	count: number
}
