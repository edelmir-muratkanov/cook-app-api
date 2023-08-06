import {
	Controller,
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'

import { UploadService } from './upload.service'

@ApiTags('upload')
@Controller('upload')
export class UploadController {
	constructor(
		private readonly uploadService: UploadService,
		private readonly configService: ConfigService,
	) {}

	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Загрузка изображение' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				image: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async upload(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 4 * 1000 * 1000,
					}),
					new FileTypeValidator({ fileType: 'image' }),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		return await this.uploadService.upload(file)
	}
}
