import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'

import { FeedbackModule } from './feedback/feedback.module'
import { ProductsModule } from './products/products.module'
import { RecipesModule } from './recipes/recipes.module'
import { AllExceptionsFilter } from './shared/filters/all-exception.filter'
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
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
