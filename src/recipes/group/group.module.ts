import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RecipeGroup } from 'src/shared/database/entities'

import { GroupController } from './group.controller'
import { GroupService } from './group.service'
import { CategoryModule } from '../category/category.module'

@Module({
	controllers: [GroupController],
	providers: [GroupService],
	imports: [CategoryModule, TypeOrmModule.forFeature([RecipeGroup])],
	exports: [GroupService],
})
export class GroupModule {}
