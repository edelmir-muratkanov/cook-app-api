import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

import { CreateInstructionDto } from './create-instruction.dto'

export class UpdateInstructionDto extends PartialType(CreateInstructionDto) {
	@IsUUID()
	@IsNotEmpty()
	id: string
}
