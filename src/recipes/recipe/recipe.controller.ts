import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	Query,
	Put,
} from '@nestjs/common'
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'

import { ApiErrorResponse } from 'src/shared/decorators/api-error-response.decorator'
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CurrentUser } from 'src/shared/decorators/current-user.decorator'
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto'
import { PaginationDto } from 'src/shared/dto/pagination.dto'
import { Recipe } from 'src/shared/typeorm/entities'

import { CreateReactionDto } from './dto/create-reaction.dto'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { FilterRecipeDto } from './dto/filter-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { RecipeService } from './services/recipe.service'

@ApiTags('recipe')
@Controller('recipe')
export class RecipeController {
	constructor(private readonly recipeService: RecipeService) {}

	@ApiOperation({
		summary: 'Создание рецепта вместе с ингредиентами и инструкциями',
		description: 'Доступно только автору рецепта',
	})
	@ApiOkResponse({ type: Recipe })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth()
	@Post()
	async create(
		@CurrentUser('id') userId: string,
		@Body() dto: CreateRecipeDto,
	) {
		return await this.recipeService.create(userId, dto)
	}

	@ApiOperation({
		summary: 'Получение всех рецептов',
	})
	@ApiPaginatedResponse(Recipe)
	@ApiErrorResponse()
	@Get()
	async findAll(
		@Query() dto: PaginationDto,
		@Query() filterDto: FilterRecipeDto,
	) {
		return await this.recipeService.findAll(dto, filterDto)
	}

	@ApiOperation({ summary: 'Получение рецепта' })
	@ApiOkResponse({ type: Recipe })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.recipeService.findOne(
			{ id },
			{
				author: true,
				comments: true,
				cuisine: true,
				ingredients: true,
				instructions: true,
				ratings: true,
			},
		)
	}

	@ApiOperation({
		summary: 'Обновление рецепта',
		description: 'Доступно только автору рецепта',
	})
	@ApiOkResponse({ type: Recipe })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth()
	@Put(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateRecipeDto,
	) {
		return await this.recipeService.update(id, dto)
	}

	@ApiOperation({
		summary: 'Оценить рецепт',
		description: 'Доступно только авторизованным пользователям',
	})
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth()
	@Patch(':id/react')
	async react(
		@Param('id', ParseUUIDPipe) id: string,
		@CurrentUser('id') userId: string,
		@Body() dto: CreateReactionDto,
	) {
		return await this.recipeService.rate(id, userId, dto)
	}

	@ApiOperation({
		summary: 'Удаление рецепта',
		description: 'Доступно только автору рецепта',
	})
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse()
	@ApiNotFoundResponse({ type: ErrorResponseDto })
	@Auth()
	@Delete(':id')
	async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return await this.recipeService.remove(id, userId)
	}
}
