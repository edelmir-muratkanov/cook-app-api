class Excetion {
	name: string
	message: string[] | string
}

export class ErrorResponseDto {
	statusCode: number
	timestamp: string
	path: string
	params: unknown
	query: unknown
	exception: Excetion
}
