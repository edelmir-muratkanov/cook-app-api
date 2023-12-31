import { OmitType, PartialType } from '@nestjs/swagger'

import { CreateGroupDto } from './create-group.dto'

export class UpdateGroupDto extends OmitType(PartialType(CreateGroupDto), [
	'categoryId',
]) {}
