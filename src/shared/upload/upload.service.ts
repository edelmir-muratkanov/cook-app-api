import { extname } from 'path'

import { Injectable } from '@nestjs/common'
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'

@Injectable()
export class UploadService {
	async upload(file: Express.Multer.File) {
		const uploadFolder = `${path}/uploads`
		await ensureDir(uploadFolder)

		const newName = this.editFileName(file.originalname)
		await writeFile(`${uploadFolder}/${newName}`, file.buffer)

		return `/uploads/${newName}`
	}

	private editFileName(filename: string) {
		const extName = extname(filename)

		const randomName = randomStringGenerator()

		return `${randomName}${extName}`
	}
}
