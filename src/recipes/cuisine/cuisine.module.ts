import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Cuisine } from 'src/shared/typeorm/entities'

import { CuisineController } from './cuisine.controller'
import { CuisineService } from './cuisine.service'

@Module({
	controllers: [CuisineController],
	providers: [CuisineService],
	imports: [TypeOrmModule.forFeature([Cuisine])],
	exports: [CuisineService],
})
export class CuisineModule {}
