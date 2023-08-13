import { IsEnum } from 'class-validator'

import { REACTION } from 'src/shared/typeorm/entities'

export class CreateReactionDto {
	@IsEnum(REACTION)
	reaction: REACTION
}
