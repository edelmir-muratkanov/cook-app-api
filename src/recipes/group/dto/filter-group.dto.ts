import { OmitType, PartialType } from '@nestjs/swagger'

import { CreateGroupDto } from './create-group.dto'

export class GroupFilterDto extends PartialType(
	OmitType(CreateGroupDto, ['description']),
) {}
