import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Request } from 'express'

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name)

	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: T, host: ArgumentsHost) {
		this.logger.error(exception)

		const ctx = host.switchToHttp()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const response = ctx.getResponse()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const request = ctx.getRequest()

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		response
			.status(httpStatus)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			.json(this._response(httpStatus, request, exception))
	}

	private _response(status: number, request: Request, exception: any) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const message = exception.response.message
			? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			  exception.response.message
			: // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			  exception.message

		return {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.path,
			method: request.method,
			params: request.params,
			query: request.query,
			exception: {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				name: exception['name'],
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				message,
			},
		}
	}
}
