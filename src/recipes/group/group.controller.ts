import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseUUIDPipe,
	Query,
	Put,
} from '@nestjs/common'
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'

import { ApiErrorResponse } from 'src/shared/decorators/api-error-response.decorator'
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto'
import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { ROLE, RecipeGroup } from 'src/shared/typeorm/entities'

import { CreateGroupDto } from './dto/create-group.dto'
import { GroupFilterDto } from './dto/filter-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { GroupService } from './group.service'

@ApiTags('recipe-group')
@Controller('recipe-group')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@ApiOkResponse({ type: RecipeGroup })
	@ApiOperation({
		summary: 'Создание группы рецептов',
		description: 'Доступно только админам',
	})
	@ApiErrorResponse()
	@Auth(ROLE.ADMIN)
	@Post()
	async create(@Body() dto: CreateGroupDto) {
		return this.groupService.create(dto)
	}

	@ApiOperation({ summary: 'Получение всех групп рецептов' })
	@ApiPaginatedResponse(RecipeGroup)
	@ApiErrorResponse()
	@Get()
	async findAll(
		@Query() dto: PaginationDto,
		@Query() filterDto: GroupFilterDto,
	) {
		return this.groupService.findAll(dto, filterDto)
	}

	@ApiOperation({ summary: 'Получение группы рецептов' })
	@ApiOkResponse({ type: RecipeGroup })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.groupService.findOne({ id }, { recipes: true })
	}

	@ApiOperation({
		summary: 'Обновление группы рецептов',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: RecipeGroup })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth(ROLE.ADMIN)
	@Put(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateGroupDto,
	) {
		return this.groupService.update(id, dto)
	}

	@ApiOperation({
		summary: 'Удаление группы рецептов',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth(ROLE.ADMIN)
	@Delete(':id')
	async remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.groupService.remove(id)
	}
}
