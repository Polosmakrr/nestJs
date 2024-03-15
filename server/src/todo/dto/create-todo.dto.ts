import { IsNotEmpty, IsOptional, Validate } from 'class-validator'
import { Transform } from 'class-transformer'
import { TodoStatus } from '../entities/todo.entity'
import { IsValidTodoStatus } from '../todo-status.validator'

export class CreateTodoDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  title: string
  @IsOptional()
  description: string
  @Validate(IsValidTodoStatus)
  @IsOptional()
  status: TodoStatus
}
