import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDto {
	@ApiProperty({ type: Number })
	@IsOptional()
	@Min(0)
	@IsNumber({ allowInfinity: false, allowNaN: false })
	@Type(() => Number)
	offset? = 0

	@ApiProperty({ type: Number })
	@IsOptional()
	@IsNumber({ allowInfinity: false, allowNaN: false })
	@IsPositive()
	@Type(() => Number)
	limit? = 15
}
