import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FeedbackModule } from './feedback/feedback.module'
import { ProductsModule } from './products/products.module'
import { RecipesModule } from './recipes/recipes.module'
import { ProvidersModule } from './shared/providers/providers.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ProvidersModule,

		FeedbackModule,
		UsersModule,
		ProductsModule,
		RecipesModule,
	],
})
export class AppModule {}
