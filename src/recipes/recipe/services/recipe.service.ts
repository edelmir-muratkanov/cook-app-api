import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { Rating, Recipe } from 'src/shared/typeorm/entities'
import { UserService } from 'src/users/user/user.service'

import { IngredientService } from './ingredient.service'
import { InstructionService } from './instruction.service'
import { CuisineService } from '../../cuisine/cuisine.service'
import { GroupService } from '../../group/group.service'
import { CreateReactionDto } from '../dto/create-reaction.dto'
import { CreateRecipeDto } from '../dto/create-recipe.dto'
import { FilterRecipeDto } from '../dto/filter-recipe.dto'
import { UpdateRecipeDto } from '../dto/update-recipe.dto'
import { RecipeIdentifiers, RecipeRelations } from '../recipe.interface'

@Injectable()
export class RecipeService {
	constructor(
		@InjectRepository(Recipe)
		private readonly recipeRepository: Repository<Recipe>,
		@InjectRepository(Rating)
		private readonly ratingRepository: Repository<Rating>,

		private readonly cuisineService: CuisineService,
		private readonly groupService: GroupService,
		private readonly userService: UserService,

		private readonly instructionService: InstructionService,
		private readonly ingredientService: IngredientService,
	) {}

	async create(userId: string, dto: CreateRecipeDto) {
		const { cuisineId, groupId, ingredients, instructions, ...rest } = dto

		const cuisine = await this.cuisineService.findExists(cuisineId)
		const group = await this.groupService.findExists(groupId)
		const user = await this.userService.findExists(userId)

		const newRecipe = this.recipeRepository.create({
			author: user,
			cuisine,
			group,
			...rest,
		})

		const recipe = await this.recipeRepository.save(newRecipe)

		ingredients.map(async ingredient => {
			await this.ingredientService.create(recipe.id, ingredient)
		})

		instructions.map(async instruction => {
			await this.instructionService.create(recipe.id, instruction)
		})

		return recipe
	}

	async findAll(pagination: PaginationDto, filter: FilterRecipeDto) {
		const filterParams: FindOptionsWhere<Recipe> = {
			author: {
				id: filter.authorId,
			},
			cuisine: {
				id: filter.cuisineId,
			},
			group: {
				id: filter.groupId,
			},
			ingredients: {
				product: {
					id: filter.productId,
				},
			},
			name: filter.name && ILike(`%${filter.name}%`),
		}

		const [data, count] = await this.recipeRepository.findAndCount({
			where: filterParams,
			take: pagination.limit,
			skip: pagination.offset,
		})

		return { data, count }
	}

	async findOne(identifiers: RecipeIdentifiers, relations?: RecipeRelations) {
		return await this.recipeRepository.findOne({
			where: identifiers,
			relations,
		})
	}

	async findExists(id: string) {
		const recipe = await this.findOne({ id })

		if (!recipe) {
			throw new NotFoundException(`Recipe by id ${id} not found`)
		}
		return recipe
	}

	async update(id: string, dto: UpdateRecipeDto) {
		const { ingredients, instructions, ...rest } = dto

		await this.findExists(id)

		if (ingredients && ingredients.length) {
			ingredients.map(async ingredient => {
				await this.ingredientService.update(ingredient)
			})
		}

		if (instructions && instructions.length) {
			instructions.map(async instruction => {
				await this.instructionService.update(instruction)
			})
		}

		const recipe = await this.findExists(id)

		return await this.recipeRepository.save({ ...recipe, ...rest })
	}

	async remove(id: string) {
		const recipe = await this.findExists(id)
		recipe.ingredients.map(async ingredient => {
			await this.ingredientService.remove(ingredient.id)
		})

		recipe.instructions.map(async instruction => {
			await this.instructionService.remove(instruction.id)
		})

		await this.recipeRepository.remove(recipe)

		return true
	}

	async rate(id: string, userId: string, { reaction }: CreateReactionDto) {
		const recipe = await this.findOne({ id }, { author: true })
		const user = await this.userService.findExists(userId)

		if (!recipe) {
			throw new NotFoundException(`Recipe by id ${id} not found`)
		}

		if (recipe.author.id === user.id) {
			throw new BadRequestException('Author can not react')
		}

		const rating = await this.ratingRepository.findOne({
			where: {
				recipe: {
					id: recipe.id,
				},
				user: { id: user.id },
			},
		})

		if (rating) {
			await this.ratingRepository.save({ ...rating, reaction })
		} else {
			await this.ratingRepository.save({ user, recipe, reaction })
		}

		return true
	}
}
