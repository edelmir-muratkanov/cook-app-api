import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'

import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
	controllers: [UploadController],
	providers: [UploadService],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads',
		}),
	],
})
export class UploadModule {}
