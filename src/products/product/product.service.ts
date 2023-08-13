import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { Product } from 'src/shared/database/entities'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

import { CreateProductDto } from './dto/create-product.dto'
import { ProductFilterDto } from './dto/product-filter.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductIdentifiers, ProductRelations } from './product.interface'
import { CategoryService } from '../category/category.service'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		private readonly categoryService: CategoryService,
	) {}

	async create(dto: CreateProductDto) {
		const product = await this.findOne({ name: dto.name })

		if (product) {
			throw new BadRequestException('Product already exists')
		}
		const category = await this.categoryService.findExists(dto.categoryId)

		const newProduct = this.productRepository.create(dto)
		newProduct.category = category

		return await this.productRepository.save(newProduct)
	}

	async findAll(pagination: PaginationDto, filterDto: ProductFilterDto) {
		const filterOptions: FindOptionsWhere<Product> = {
			name: filterDto.name && ILike(`%${filterDto.name}%`),
			category: {
				id: filterDto.categoryId,
			},
		}

		return await this.productRepository.findAndCount({
			take: pagination.limit,
			skip: pagination.offset,
			where: filterOptions,
		})
	}

	async findOne(identifiers: ProductIdentifiers, relations?: ProductRelations) {
		return await this.productRepository.findOne({
			where: identifiers,
			relations: relations,
		})
	}

	async findExists(id: string) {
		const product = await this.findOne({ id })
		if (!product) {
			throw new NotFoundException(`Product by id ${id} not found`)
		}
		return product
	}

	async update(id: string, dto: UpdateProductDto) {
		const product = await this.findExists(id)

		return await this.productRepository.save({ ...product, ...dto })
	}

	async remove(id: string) {
		const product = await this.findExists(id)
		await this.productRepository.remove(product)

		return true
	}
}
