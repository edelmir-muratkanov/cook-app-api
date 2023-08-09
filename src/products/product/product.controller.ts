import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
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
import { Product, ROLE } from 'src/shared/typeorm/entities'

import { CreateProductDto } from './dto/create-product.dto'
import { ProductFilterDto } from './dto/product-filter.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'

@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Auth(ROLE.ADMIN)
	@ApiOperation({
		summary: 'Создание продукта',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Product })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Post()
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto)
	}

	@ApiOperation({
		summary: 'Получение всех продуктов',
	})
	@ApiErrorResponse()
	@ApiPaginatedResponse(Product)
	@Get()
	async findAll(
		@Query() dto: PaginationDto,
		@Query() filterDto: ProductFilterDto,
	) {
		return await this.productService.findAll(dto, filterDto)
	}

	@ApiOperation({
		summary: 'Получение продукта',
	})
	@ApiOkResponse({ type: Product })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.productService.byId(id)
	}

	@Auth(ROLE.ADMIN)
	@ApiOperation({
		summary: 'Обновление продукта',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Product })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Patch(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateProductDto,
	) {
		return await this.productService.update(id, dto)
	}

	@Auth(ROLE.ADMIN)
	@ApiOperation({
		summary: 'Удаление продукта',
		description: 'Доступно только админам',
	})
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Delete(':id')
	async remove(@Param('id', ParseUUIDPipe) id: string) {
		return await this.productService.remove(id)
	}
}
