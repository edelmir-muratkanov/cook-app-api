import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from 'src/shared/typeorm/entities'

import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { CategoryModule } from '../category/category.module'

@Module({
	imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
