import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { Cuisine } from 'src/shared/database/entities'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

import { CuisineIdentifiers, CuisineRelations } from './cuisine.interface'
import { CreateCuisineDto } from './dto/create-cuisine.dto'
import { FilterCuisineDto } from './dto/filter-cuisine.dto'
import { UpdateCuisineDto } from './dto/update-cuisine.dto'

@Injectable()
export class CuisineService {
	constructor(
		@InjectRepository(Cuisine)
		private readonly cuisineRepository: Repository<Cuisine>,
	) {}

	async findOne(identifiers: CuisineIdentifiers, relations?: CuisineRelations) {
		return await this.cuisineRepository.findOne({
			where: identifiers,
			relations: relations,
		})
	}

	async findExists(id: string) {
		const cuisine = await this.findOne({ id })
		if (!cuisine) {
			throw new NotFoundException(`Cuisine by id ${id} not found`)
		}
		return cuisine
	}

	async create(dto: CreateCuisineDto) {
		const cuisine = await this.findOne({ name: dto.name })
		if (cuisine) {
			throw new BadRequestException('Cuisine already exists')
		}

		const newCuisine = this.cuisineRepository.create(dto)
		return await this.cuisineRepository.save(newCuisine)
	}

	async findAll(pagination: PaginationDto, filter: FilterCuisineDto) {
		const filterOptions: FindOptionsWhere<Cuisine> = {
			name: filter.name && ILike(`%${filter.name}%`),
		}

		const [data, count] = await this.cuisineRepository.findAndCount({
			where: filterOptions,
			take: pagination.limit,
			skip: pagination.offset,
		})

		return { data, count }
	}

	async update(id: string, dto: UpdateCuisineDto) {
		const cuisine = await this.findExists(id)
		return await this.cuisineRepository.save({ ...cuisine, ...dto })
	}

	async remove(id: string) {
		const cuisine = await this.findExists(id)
		await this.cuisineRepository.remove(cuisine)
		return true
	}
}
