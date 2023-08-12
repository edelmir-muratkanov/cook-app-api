import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const port = configService.get<number>('APP_PORT', 8000)

	app.setGlobalPrefix('api')

	const config = new DocumentBuilder()
		.setTitle('Cook app')
		.setDescription('Cook app documentation')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api/docs', app, document)

	await app.listen(port, async () => {
		const serverUrl = await app.getUrl()

		Logger.log(`Server started ${serverUrl}`)
		Logger.log(`Swagger documentation avalable at ${serverUrl}/api/docs`)
	})
}

void bootstrap()
