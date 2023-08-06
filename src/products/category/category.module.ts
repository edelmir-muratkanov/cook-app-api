import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductCategory } from 'src/shared/typeorm/entities'

import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
	imports: [TypeOrmModule.forFeature([ProductCategory])],
	controllers: [CategoryController],
	providers: [CategoryService],
	exports: [CategoryService],
})
export class CategoryModule {}
