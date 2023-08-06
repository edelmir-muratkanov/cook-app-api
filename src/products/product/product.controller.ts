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
import { ApiTags } from '@nestjs/swagger'

import { Auth } from 'src/shared/decorators/auth.decorator'
import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { ROLE } from 'src/shared/providers/typeorm/entities'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'

@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Auth(ROLE.ADMIN)
	@Post()
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto)
	}

	@Get()
	async findAll(@Query() dto: PaginationDto) {
		return await this.productService.findAll(dto)
	}

	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.productService.byId(id)
	}

	@Auth(ROLE.ADMIN)
	@Patch(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateProductDto,
	) {
		return await this.productService.update(id, dto)
	}

	@Auth(ROLE.ADMIN)
	@Delete(':id')
	async remove(@Param('id', ParseUUIDPipe) id: string) {
		return await this.productService.remove(id)
	}
}
