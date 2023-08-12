import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ProductService } from 'src/products/product/product.service'
import { Ingredient } from 'src/shared/typeorm/entities'

import { CreateIngredientDto } from '../dto/create-ingredient.dto'
import { UpdateIngredientDto } from '../dto/update-ingredient.dto'

@Injectable()
export class IngredientService {
	constructor(
		@InjectRepository(Ingredient)
		private readonly ingredientRepository: Repository<Ingredient>,
		private readonly productService: ProductService,
	) {}

	async findExists(id: string) {
		const ingredient = await this.ingredientRepository.findOne({
			where: {
				id,
			},
		})

		if (!ingredient) {
			throw new NotFoundException(`Ingredient by id ${id} not found`)
		}

		return ingredient
	}

	async create(recipeId: string, dto: CreateIngredientDto) {
		const product = await this.productService.findExists(dto.productId)

		const ingredient = this.ingredientRepository.create({
			recipe: { id: recipeId },
			product: product,
			...dto,
		})
		return await this.ingredientRepository.save(ingredient)
	}

	async update(dto: UpdateIngredientDto) {
		const ingredient = await this.findExists(dto.id)
		return await this.ingredientRepository.save({ ...ingredient, ...dto })
	}

	async remove(id: string) {
		const ingredient = await this.findExists(id)
		await this.ingredientRepository.remove(ingredient)
		return true
	}
}
