import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RecipeCategory } from 'src/shared/database/entities'

import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [TypeOrmModule.forFeature([RecipeCategory])],
	exports: [CategoryService],
})
export class CategoryModule {}
