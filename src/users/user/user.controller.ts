import {
	Controller,
	Get,
	Body,
	Param,
	Delete,
	Put,
	Query,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags, OmitType } from '@nestjs/swagger'

import { ApiErrorResponse } from 'src/shared/decorators/api-error-response.decorator'
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CurrentUser } from 'src/shared/decorators/current-user.decorator'
import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { ParamIdDto } from 'src/shared/dto/param-id.dto'
import { User } from 'src/shared/providers/typeorm/entities'

import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Auth()
	@ApiOperation({ summary: 'Получение профиля' })
	@ApiOkResponse({ type: User })
	@ApiErrorResponse()
	@Get('me')
	async me(@CurrentUser('id') id: string) {
		return this.userService.byId(id)
	}

	@ApiOperation({ summary: 'Получение пользователя' })
	@ApiOkResponse({ type: User })
	@ApiErrorResponse()
	@Get(':id')
	async findOne(@Param('id') { id }: ParamIdDto) {
		return this.userService.byId(id)
	}

	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiPaginatedResponse(
		OmitType(User, [
			'comments',
			'followers',
			'following',
			'ratings',
			'recipes',
		]),
	)
	@ApiErrorResponse()
	@Get()
	async findAll(@Query() pagination: PaginationDto) {
		return await this.userService.findAll(pagination)
	}

	@ApiOperation({ summary: 'Обновление пользователя' })
	@ApiOkResponse({ type: User })
	@ApiErrorResponse()
	@Put(':id')
	async update(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.update(id, dto)
	}

	@ApiOperation({ summary: 'Удаление пользователя' })
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@Delete(':id')
	async remove(@CurrentUser('id') id: string) {
		return this.userService.remove(id)
	}
}
