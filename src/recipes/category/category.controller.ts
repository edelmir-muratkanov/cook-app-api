import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
	ParseUUIDPipe,
	Put,
} from '@nestjs/common'
import {
	ApiOperation,
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiTags,
} from '@nestjs/swagger'

import { CategoryFilterDto } from 'src/products/category/dto/category-filter.dto'
import { ApiErrorResponse } from 'src/shared/decorators/api-error-response.decorator'
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto'
import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { ROLE, RecipeCategory } from 'src/shared/typeorm/entities'

import { CategoryService } from './category.service'
import { CreateRecipeCategoryDto } from './dto/create-category.dto'
import { UpdateRecipeCategoryDto } from './dto/update-category.dto'

@ApiTags('recipe-category')
@Controller('recipe-category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiOperation({
		summary: 'Создание категории',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: RecipeCategory })
	@ApiErrorResponse()
	@Auth(ROLE.ADMIN)
	@Post()
	async create(@Body() dto: CreateRecipeCategoryDto) {
		return await this.categoryService.create(dto)
	}

	@ApiOperation({ summary: 'Получение всех категорий' })
	@ApiPaginatedResponse(RecipeCategory)
	@ApiErrorResponse()
	@Get()
	async findAll(
		@Query() dto: PaginationDto,
		@Query() filterDto: CategoryFilterDto,
	) {
		return await this.categoryService.findAll(dto, filterDto)
	}

	@ApiOperation({ summary: 'Получение категории' })
	@ApiOkResponse({ type: RecipeCategory })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.categoryService.findOne({ id }, { groups: true })
	}

	@ApiOperation({
		summary: 'Обновление категории',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: RecipeCategory })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth(ROLE.ADMIN)
	@Put(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateRecipeCategoryDto,
	) {
		return await this.categoryService.update(id, dto)
	}

	@ApiOperation({
		summary: 'Удаление категории',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth(ROLE.ADMIN)
	@Delete(':id')
	async remove(@Param('id', ParseUUIDPipe) id: string) {
		return await this.categoryService.remove(id)
	}
}
