import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const port = configService.get<number>('APP_PORT', 8000)
	const config = new DocumentBuilder()
		.setTitle('Cook app')
		.setDescription('Cook app documentation')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document)

	await app.listen(port, () => {
		Logger.log(`Server started on port ${port}`)
		Logger.log(`Swagger documentation avalable at http://localhost:${port}/api`)
	})
}

void bootstrap()
