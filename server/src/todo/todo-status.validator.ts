import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'
import { TodoStatus } from './entities/todo.entity'

@ValidatorConstraint({ name: 'isValidTodoStatus', async: false })
export class IsValidTodoStatus implements ValidatorConstraintInterface {
  validate(text: TodoStatus, args: ValidationArguments) {
    return Object.values(TodoStatus).includes(text)
  }
  defaultMessage(args: ValidationArguments) {
    return (
      'Invalid status. Allowed values: ' + Object.values(TodoStatus).join(', ')
    )
  }
}
