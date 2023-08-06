import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { Product } from 'src/shared/typeorm/entities'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CategoryService } from '../category/category.service'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		private readonly categoryService: CategoryService,
	) {}

	async create(dto: CreateProductDto) {
		const product = await this.byName(dto.name)

		if (product) {
			throw new BadRequestException('Product already exists')
		}
		const category = await this.categoryService.getCategoryExists(
			dto.categoryId,
		)

		const newProduct = this.productRepository.create(dto)
		newProduct.category = category

		return await this.productRepository.save(newProduct)
	}

	async findAll(pagination: PaginationDto) {
		return await this.productRepository.findAndCount({
			take: pagination.limit,
			skip: pagination.offset,
		})
	}

	async byId(id: string) {
		return await this.productRepository.findOne({ where: { id } })
	}

	async byName(name: string) {
		return await this.productRepository.findOne({ where: { name } })
	}

	async update(id: string, dto: UpdateProductDto) {
		const product = await this.getProductExists(id)

		return await this.productRepository.save({ ...product, ...dto })
	}

	async remove(id: string) {
		const product = await this.getProductExists(id)
		await this.productRepository.remove(product)

		return true
	}

	async getProductExists(id: string) {
		const product = await this.byId(id)
		if (!product) {
			throw new NotFoundException(`Product by id ${id} not found`)
		}
		return product
	}
}
