import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
	OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcrypt'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'

import { ROLE, User } from 'src/shared/database/entities'
import { PaginationDto } from 'src/shared/dto/pagination.dto'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserFilterDto } from './dto/user-filter.dto'
import { UserIdentifiers, UserRelations } from './user.interface'

@Injectable()
export class UserService implements OnModuleInit {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly configService: ConfigService,
	) {}

	async onModuleInit() {
		const email = this.configService.get<string>('APP_ADMIN_EMAIL')
		const username = this.configService.get<string>('APP_ADMIN_USERNAME')
		const password = this.configService.get<string>('APP_ADMIN_PASSWORD')

		if (!email || !username || !password) {
			throw Error('Admin credentials not set in env')
		}

		const admin = await this.userRepository.findOne({ where: { email } })
		if (!admin) {
			const hashPassword = await this.hashPassword(password)
			const newAdmin = this.userRepository.create({
				email,
				username,
				password: hashPassword,
				role: ROLE.ADMIN,
			})
			await this.userRepository.save(newAdmin)
		}

		if (admin && admin?.role !== ROLE.ADMIN) {
			admin.role = ROLE.ADMIN
			await this.userRepository.save(admin)
		}

		Logger.log(
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			`Admin credentials ${admin?.email} ${admin?.username} ${password}, role: ${admin?.role}`,
			'ADMIN',
		)
	}

	async create(dto: CreateUserDto) {
		const user = await this.findOne({ email: dto.email })
		if (user) {
			throw new BadRequestException('User already exists')
		}

		const newUser = this.userRepository.create({
			...dto,
			password: await this.hashPassword(dto.password),
		})
		return await this.userRepository.save(newUser)
	}

	async findAll(pagination: PaginationDto, filter: UserFilterDto) {
		const filterOptions: FindOptionsWhere<User> = {
			username: filter.username && ILike(`%${filter.username}%`),
			role: filter.role,
		}

		const [data, count] = await this.userRepository.findAndCount({
			where: filterOptions,
			skip: pagination.offset,
			take: pagination.limit,
		})
		return { data, count }
	}

	async findOne(identifiers: UserIdentifiers, relations?: UserRelations) {
		return await this.userRepository.findOne({
			where: identifiers,
			relations,
		})
	}

	async findExists(id: string) {
		const user = await this.findOne({ id })
		if (!user) {
			throw new NotFoundException(`User by id ${id} not found`)
		}
		return user
	}

	async update(id: string, dto: UpdateUserDto) {
		const user = await this.findExists(id)
		return await this.userRepository.save({ ...user, ...dto })
	}

	async remove(id: string) {
		const user = await this.findExists(id)
		try {
			await this.userRepository.remove(user)
		} catch {
			return false
		}

		return true
	}

	async setRole(id: string, role: ROLE) {
		const user = await this.findExists(id)

		user.role = role

		await this.userRepository.save(user)

		return user
	}

	async subscribe(currentId: string, targetId: string) {
		const currentUser = await this.findExists(currentId)
		const targetUser = await this.findExists(targetId)

		currentUser.following.push(targetUser)
		targetUser.followers.push(currentUser)

		await this.userRepository.save(currentUser)
		await this.userRepository.save(targetUser)

		return true
	}

	private async hashPassword(password: string) {
		const salt = await genSalt(10)
		return await hash(password, salt)
	}
}
