import {
	ClassSerializerInterceptor,
	Module,
	ValidationPipe,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

import { ProductsModule } from './products/products.module'
import { RecipesModule } from './recipes/recipes.module'
import { DatabaseModule } from './shared/database/database.module'
import { AllExceptionsFilter } from './shared/filters/all-exception.filter'
import { UploadModule } from './shared/upload/upload.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		UploadModule,

		UsersModule,
		ProductsModule,
		RecipesModule,
	],
	providers: [
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				transform: true,
				validateCustomDecorators: true,
				whitelist: true,
				transformOptions: {
					enableImplicitConversion: true,
				},
			}),
		},
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule {}
