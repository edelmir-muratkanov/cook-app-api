import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Query,
	ParseUUIDPipe,
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
import { Cuisine, ROLE } from 'src/shared/typeorm/entities'

import { CuisineService } from './cuisine.service'
import { CreateCuisineDto } from './dto/create-cuisine.dto'
import { FilterCuisineDto } from './dto/filter-cuisine.dto'
import { UpdateCuisineDto } from './dto/update-cuisine.dto'

@ApiTags('recipe-cuisine')
@Controller('recipe-cuisine')
export class CuisineController {
	constructor(private readonly cuisineService: CuisineService) {}

	@ApiOperation({
		summary: 'Создание кухни',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Cuisine })
	@ApiErrorResponse()
	@Auth(ROLE.ADMIN)
	@Post()
	async create(@Body() dto: CreateCuisineDto) {
		return await this.cuisineService.create(dto)
	}

	@ApiOperation({ summary: 'Получение всех кухнь' })
	@ApiPaginatedResponse(Cuisine)
	@ApiErrorResponse()
	@Get()
	async findAll(
		@Query() dto: PaginationDto,
		@Query() filterDto: FilterCuisineDto,
	) {
		return await this.cuisineService.findAll(dto, filterDto)
	}

	@ApiOperation({ summary: 'Получение кухни' })
	@ApiOkResponse({ type: Cuisine })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.cuisineService.byId(id)
	}

	@ApiOperation({
		summary: 'Обновление кухни',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Cuisine })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth(ROLE.ADMIN)
	@Put(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateCuisineDto,
	) {
		return await this.cuisineService.update(id, dto)
	}

	@ApiOperation({
		summary: 'Удаление кухни',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth(ROLE.ADMIN)
	@Delete(':id')
	async remove(@Param('id', ParseUUIDPipe) id: string) {
		return await this.cuisineService.remove(id)
	}
}
