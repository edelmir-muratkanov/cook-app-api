import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Instruction } from 'src/shared/database/entities'

import { CreateInstructionDto } from '../dto/create-instruction.dto'
import { UpdateInstructionDto } from '../dto/update-instruction.dto'

@Injectable()
export class InstructionService {
	constructor(
		@InjectRepository(Instruction)
		private readonly instructionRepository: Repository<Instruction>,
	) {}

	async findExists(id: string) {
		const instruction = await this.instructionRepository.findOne({
			where: { id },
		})

		if (!instruction) {
			throw new NotFoundException(`Instruction by id ${id} not found`)
		}

		return instruction
	}

	async create(recipeId: string, dto: CreateInstructionDto) {
		const instruction = this.instructionRepository.create({
			recipe: {
				id: recipeId,
			},
			...dto,
		})
		return await this.instructionRepository.save(instruction)
	}

	async update(dto: UpdateInstructionDto) {
		const instruction = await this.findExists(dto.id)

		return await this.instructionRepository.save({ ...instruction, ...dto })
	}

	async remove(id: string) {
		const instruction = await this.findExists(id)
		await this.instructionRepository.remove(instruction)
		return true
	}
}
