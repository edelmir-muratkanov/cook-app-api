import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { ProductCategory } from 'src/shared/typeorm/entities'

import { CreateProductCategoryDto } from './dto/create-category.dto'
import { UpdateProductCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(ProductCategory)
		private readonly categoryRepository: Repository<ProductCategory>,
	) {}

	async create(dto: CreateProductCategoryDto) {
		const category = await this.byName(dto.name)
		if (category) {
			throw new BadRequestException('Category already exists')
		}
		const newCategory = this.categoryRepository.create(dto)
		return await this.categoryRepository.save(newCategory)
	}

	async findAll(pagination: PaginationDto) {
		const [data, count] = await this.categoryRepository.findAndCount({
			take: pagination.limit,
			skip: pagination.offset,
		})

		return { data, count }
	}

	async byId(id: string) {
		return await this.categoryRepository.findOne({
			where: { id },
			relations: { products: true },
		})
	}

	async byName(name: string) {
		return await this.categoryRepository.findOne({
			where: { name },
			relations: { products: true },
		})
	}

	async update(id: string, dto: UpdateProductCategoryDto) {
		const category = await this.byId(id)
		if (!category) {
			throw new NotFoundException(`Category by id ${id} not found`)
		}

		return await this.categoryRepository.save({ ...category, ...dto })
	}

	async remove(id: string) {
		const category = await this.byId(id)
		if (!category) {
			throw new NotFoundException(`Category by id ${id} not found`)
		}
		await this.categoryRepository.remove(category)
		return true
	}

	async getCategoryExists(id: string) {
		const category = await this.byId(id)
		if (!category) {
			throw new NotFoundException(`Product category by id ${id} not found`)
		}

		return category
	}
}
