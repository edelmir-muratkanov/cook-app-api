import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { RecipeCategory } from 'src/shared/database/entities'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

import {
	RecipeCategoryIdentifiers,
	RecipeCategoryRelations,
} from './category.interface'
import { RecipeCategoryFilterDto } from './dto/category-filter.dto'
import { CreateRecipeCategoryDto } from './dto/create-category.dto'
import { UpdateRecipeCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(RecipeCategory)
		private readonly categoryRepository: Repository<RecipeCategory>,
	) {}

	async findOne(
		identifiers: RecipeCategoryIdentifiers,
		relations?: RecipeCategoryRelations,
	) {
		return await this.categoryRepository.findOne({
			where: identifiers,
			relations: relations,
		})
	}

	async findExists(id: string) {
		const category = await this.findOne({ id })
		if (!category) {
			throw new NotFoundException(`Category by id ${id} not found`)
		}
		return category
	}

	async create(dto: CreateRecipeCategoryDto) {
		const category = await this.findOne({ name: dto.name })
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
		const category = await this.findExists(id)
		return await this.categoryRepository.save({ ...category, ...dto })
	}

	async remove(id: string) {
		const category = await this.findExists(id)
		await this.categoryRepository.remove(category)
		return true
	}
}
