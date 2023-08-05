import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { ENTITIES } from './entities'

export const options = (configService: ConfigService): TypeOrmModuleOptions => {
	const isProd = configService.get<boolean>('APP_IS_PROD', false)
	const name = configService.get<string>('DB_NAME')
	const user = configService.get<string>('DB_USER')
	const pass = configService.get<string>('DB_PASS')
	const host = configService.get<string>('DB_HOST')
	const port = configService.get<number>('DB_PORT')

	if (!name || !user || !pass || !host || !port) {
		throw new Error('Database environment is not set')
	}

	return {
		type: 'postgres',
		schema: 'public',
		logging: !isProd,
		entities: ENTITIES,
		synchronize: true,
		database: name,
		password: pass,
		username: user,
		host,
		port,
	}
}
