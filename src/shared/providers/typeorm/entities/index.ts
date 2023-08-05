import { Comment } from './comment.entity'
import { Cuisine } from './cuisine.entity'
import { Ingredient } from './ingredient.entity'
import { Instruction } from './instruction.entity'
import { ProductCategory } from './product-category.entity'
import { Product } from './product.entity'
import { Rating } from './rating.entity'
import { RecipeCategory } from './recipe-category.entity'
import { RecipeGroup } from './recipe-group.entity'
import { Recipe } from './recipe.entity'
import { User } from './user.entity'

export const ENTITIES = [
	User,
	RecipeCategory,
	RecipeGroup,
	Cuisine,
	Ingredient,
	ProductCategory,
	Product,
	Recipe,
	Instruction,
	Comment,
	Rating,
]

export * from './comment.entity'
export * from './cuisine.entity'
export * from './ingredient.entity'
export * from './instruction.entity'
export * from './product-category.entity'
export * from './product.entity'
export * from './rating.entity'
export * from './recipe-category.entity'
export * from './recipe-group.entity'
export * from './recipe.entity'
export * from './user.entity'
