import { Module } from '@nestjs/common'

import { CuisineController } from './cuisine.controller'
import { CuisineService } from './cuisine.service'

@Module({
	controllers: [CuisineController],
	providers: [CuisineService],
})
export class CuisineModule {}
