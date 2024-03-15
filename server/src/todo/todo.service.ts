import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo, TodoStatus } from './entities/todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(createTodoDto)
  }

  async findAll(page?: number, limit?: number, status?: TodoStatus | string) {
    const todos = await this.todoRepository.find({
      where: { status },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    const pages =
      (
        await this.todoRepository.find({
          where: { status },
        })
      ).length / limit

    const totalPages = Math.ceil(pages)

    return { todos, page, totalPages }
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({ where: { id } })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } })
    if (!todo) throw new NotFoundException('Todo not found')
    return await this.todoRepository.update(id, updateTodoDto)
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } })
    if (!todo) throw new NotFoundException('Todo not found')
    return await this.todoRepository.delete(id)
  }
}
