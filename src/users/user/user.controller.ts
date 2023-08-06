import {
	Controller,
	Get,
	Body,
	Param,
	Delete,
	Put,
	Query,
	Patch,
	ParseUUIDPipe,
} from '@nestjs/common'
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
	OmitType,
} from '@nestjs/swagger'

import { ApiErrorResponse } from 'src/shared/decorators/api-error-response.decorator'
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CurrentUser } from 'src/shared/decorators/current-user.decorator'
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto'
import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { ROLE, User } from 'src/shared/typeorm/entities'

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
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.userService.byId(id)
	}

	@Auth(ROLE.ADMIN)
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

	@Auth()
	@ApiOperation({ summary: 'Обновление пользователя' })
	@ApiOkResponse({ type: User })
	@ApiErrorResponse()
	@Put(':id')
	async update(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
		return await this.userService.update(id, dto)
	}

	@Auth()
	@ApiOperation({ summary: 'Удаление пользователя' })
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@Delete(':id')
	async remove(@CurrentUser('id') id: string) {
		return await this.userService.remove(id)
	}

	@Auth()
	@ApiOperation({ summary: 'Подписка на пользователя' })
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Patch(':id/subscribe')
	async subscribe(
		@CurrentUser('id') currentId: string,
		@Param('id', ParseUUIDPipe) id: string,
	) {
		return await this.userService.subscribe(currentId, id)
	}

	@Auth(ROLE.ADMIN)
	@ApiOperation({ summary: 'Назначение роли' })
	@ApiOkResponse({ type: User })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@ApiParam({ name: 'role', enum: ROLE })
	@Patch(':id/:role')
	async setRole(
		@Param('id', ParseUUIDPipe) id: string,
		@Param('role') role: ROLE,
	) {
		return await this.userService.setRole(id, role)
	}
}
