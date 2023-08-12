import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { RecipeCategory } from 'src/shared/typeorm/entities'

import { RecipeCategoryFilterDto } from './dto/category-filter.dto'
import { CreateRecipeCategoryDto } from './dto/create-category.dto'
import { UpdateRecipeCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(RecipeCategory)
		private readonly categoryRepository: Repository<RecipeCategory>,
	) {}

	async byId(id: string) {
		return await this.categoryRepository.findOne({
			where: { id },
			relations: { groups: true },
		})
	}

	async byName(name: string) {
		return await this.categoryRepository.findOne({
			where: { name },
			relations: { groups: true },
		})
	}

	async getCategoryExists(id: string) {
		const category = await this.byId(id)
		if (!category) {
			throw new NotFoundException(`Category by id ${id} not found`)
		}
		return category
	}

	async create(dto: CreateRecipeCategoryDto) {
		const category = await this.byName(dto.name)
		if (category) {
			throw new BadRequestException('Category already exists')
		}
		const newCategory = this.categoryRepository.create(dto)
		return await this.categoryRepository.save(newCategory)
	}

	async findAll(pagination: PaginationDto, filter: RecipeCategoryFilterDto) {
		const filterParams: FindOptionsWhere<RecipeCategory> = {
			name: filter.name ? ILike(`%${filter.name}%`) : undefined,
		}

		const [data, count] = await this.categoryRepository.findAndCount({
			where: filterParams,
			skip: pagination.offset,
			take: pagination.limit,
		})

		return { data, count }
	}

	async update(id: string, dto: UpdateRecipeCategoryDto) {
		const category = await this.getCategoryExists(id)
		return await this.categoryRepository.save({ ...category, ...dto })
	}

	async remove(id: string) {
		const category = await this.getCategoryExists(id)
		await this.categoryRepository.remove(category)
		return true
	}
}
