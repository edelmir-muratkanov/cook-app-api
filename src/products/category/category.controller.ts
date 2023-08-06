import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
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
import { ProductCategory, ROLE } from 'src/shared/providers/typeorm/entities'

import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('product-category')
@Controller('products/category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiOperation({
		summary: 'Создание категории',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: ProductCategory })
	@ApiErrorResponse()
	@Auth(ROLE.ADMIN)
	@Post()
	async create(@Body() dto: CreateCategoryDto) {
		return this.categoryService.create(dto)
	}

	@ApiOperation({ summary: 'Получение всех категорий' })
	@ApiPaginatedResponse(ProductCategory)
	@ApiErrorResponse()
	@Get()
	async findAll(@Query() dto: PaginationDto) {
		return this.categoryService.findAll(dto)
	}

	@ApiOperation({ summary: 'Получение категории' })
	@ApiOkResponse({ type: ProductCategory })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.categoryService.byId(id)
	}

	@ApiOperation({
		summary: 'Обновление категории',
		description: 'Доступно только админам',
	})
	@Auth(ROLE.ADMIN)
	@ApiOkResponse({ type: ProductCategory })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoryService.update(id, updateCategoryDto)
	}

	@ApiOperation({
		summary: 'Удаление категории',
		description: 'Доступно только админам',
	})
	@Auth(ROLE.ADMIN)
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.categoryService.remove(id)
	}
}
