import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { ValidationPipe, UsePipes } from '@nestjs/common'
import { TodoStatus } from './entities/todo.entity'
import { IsValidTodoStatus } from './todo-status.validator'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto)
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('status') status: TodoStatus | string,
  ) {
    if (!status || status === 'all' || status === '') {
      return this.todoService.findAll(+page, +limit)
    } else {
      return this.todoService.findAll(+page, +limit, status)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id)
  }
}
