import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const port = configService.get<number>('APP_PORT', 8000)

	await app.listen(port, () => {
		Logger.log(`Server started on port ${port}`)
	})
}

void bootstrap()
