import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcrypt'
import { Repository } from 'typeorm'

import { User } from 'src/shared/providers/typeorm/entities'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	async create(dto: CreateUserDto) {
		const user = await this.byEmail(dto.email)
		if (user) {
			throw new BadRequestException('User already exists')
		}
		const salt = await genSalt(10)
		const passwordHash = await hash(dto.password, salt)

		const newUser = this.userRepository.create({
			...dto,
			password: passwordHash,
		})
		return await this.userRepository.save(newUser)
	}

	async findAll() {
		return await this.userRepository.findAndCount()
	}

	async byId(id: string) {
		return await this.userRepository.findOne({
			where: { id },
			relations: {
				followers: true,
				following: true,
				recipes: true,
				ratings: true,
				comments: true,
			},
		})
	}

	async byEmail(email: string) {
		return await this.userRepository.findOne({
			where: { email },
			relations: {
				followers: true,
				following: true,
				recipes: true,
				ratings: true,
				comments: true,
			},
		})
	}

	async update(id: string, dto: UpdateUserDto) {
		return await this.userRepository.update(id, dto)
	}

	async remove(id: string) {
		return await this.userRepository.delete(id)
	}
}
