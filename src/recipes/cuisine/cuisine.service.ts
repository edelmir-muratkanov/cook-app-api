import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { Cuisine } from 'src/shared/typeorm/entities'

import { CreateCuisineDto } from './dto/create-cuisine.dto'
import { FilterCuisineDto } from './dto/filter-cuisine.dto'
import { UpdateCuisineDto } from './dto/update-cuisine.dto'

@Injectable()
export class CuisineService {
	constructor(
		@InjectRepository(Cuisine)
		private readonly cuisineRepository: Repository<Cuisine>,
	) {}

	async byId(id: string) {
		return await this.cuisineRepository.findOne({
			where: { id },
			relations: {
				recipes: true,
			},
		})
	}

	async byName(name: string) {
		return await this.cuisineRepository.findOne({
			where: { name },
			relations: { recipes: true },
		})
	}

	async getCuisineExists(id: string) {
		const cuisine = await this.byId(id)
		if (!cuisine) {
			throw new NotFoundException(`Cuisine by id ${id} not found`)
		}
		return cuisine
	}

	async create(dto: CreateCuisineDto) {
		const cuisine = await this.byName(dto.name)
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
		const cuisine = await this.getCuisineExists(id)
		return await this.cuisineRepository.save({ ...cuisine, ...dto })
	}

	async remove(id: string) {
		const cuisine = await this.getCuisineExists(id)
		await this.cuisineRepository.remove(cuisine)
		return true
	}
}
