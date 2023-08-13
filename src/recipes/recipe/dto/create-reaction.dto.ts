import { IsEnum } from 'class-validator'

import { REACTION } from 'src/shared/database/entities'

export class CreateReactionDto {
	@IsEnum(REACTION)
	reaction: REACTION
}
