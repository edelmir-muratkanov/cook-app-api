import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common'

import { ParamIdDto } from 'src/shared/dto/param-id.dto'

import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') { id }: ParamIdDto) {
		return this.userService.byId(id)
	}

	@Put(':id')
	async update(@Param('id') { id }: ParamIdDto, @Body() dto: UpdateUserDto) {
		return this.userService.update(id, dto)
	}

	@Delete(':id')
	async remove(@Param('id') { id }: ParamIdDto) {
		return this.userService.remove(id)
	}
}
