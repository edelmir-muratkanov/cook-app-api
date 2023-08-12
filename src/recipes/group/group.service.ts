import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { RecipeGroup } from 'src/shared/typeorm/entities'

import { CreateGroupDto } from './dto/create-group.dto'
import { GroupFilterDto } from './dto/filter-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { CategoryService } from '../category/category.service'

@Injectable()
export class GroupService {
	constructor(
		@InjectRepository(RecipeGroup)
		private readonly groupRepository: Repository<RecipeGroup>,
		private readonly categoryService: CategoryService,
	) {}

	async byId(id: string) {
		return await this.groupRepository.findOne({
			where: { id },
			relations: { recipes: true },
		})
	}

	async byName(name: string) {
		return await this.groupRepository.findOne({
			where: { name },
			relations: { recipes: true },
		})
	}

	async getGroupExists(id: string) {
		const group = await this.byId(id)
		if (!group) {
			throw new NotFoundException(`Group by id ${id} not found`)
		}
		return group
	}

	async create(dto: CreateGroupDto) {
		const group = await this.byName(dto.name)
		if (group) {
			throw new BadRequestException('Group alredy exists')
		}
		const category = await this.categoryService.getCategoryExists(
			dto.categoryId,
		)
		const newGroup = this.groupRepository.create({
			name: dto.name,
			description: dto.description,
		})
		newGroup.category = category

		return await this.groupRepository.save(newGroup)
	}

	async findAll(pagination: PaginationDto, filter: GroupFilterDto) {
		const filterParams: FindOptionsWhere<RecipeGroup> = {
			name: filter.name && ILike(`%${filter.name}%`),
			category: {
				id: filter.categoryId,
			},
		}

		const [data, count] = await this.groupRepository.findAndCount({
			where: filterParams,
			take: pagination.limit,
			skip: pagination.offset,
		})

		return { data, count }
	}

	async update(id: string, dto: UpdateGroupDto) {
		const group = await this.getGroupExists(id)
		return await this.groupRepository.save({ ...group, ...dto })
	}

	async remove(id: string) {
		const group = await this.getGroupExists(id)
		await this.groupRepository.remove(group)
		return true
	}
}
