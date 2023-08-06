import { ApiProperty } from '@nestjs/swagger'

export class Exception {
	@ApiProperty({
		description: 'Название исключения',
		example: 'NotFoundException',
	})
	name: string

	@ApiProperty({
		description: 'Сообщение исключения',
		examples: [
			'email must be email',
			'User by id SOME_ID not found',
			"['error 1', 'error2]",
		],
		anyOf: [
			{
				type: 'array',
				items: {
					type: 'string',
				},
			},
			{
				type: 'string',
			},
		],
	})
	message: string[] | string
}
