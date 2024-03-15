import { instance } from '../../api/axios.api'
import {
	getTodosStart,
	getTodosSuccess,
	getTodosFailure,
	addTodoStart,
	addTodoSuccess,
	addTodoFailure,
	editTodoStart,
	editTodoSuccess,
	editTodoFailure,
	deleteTodoStart,
	deleteTodoSuccess,
	deleteTodoFailure,
} from './todo.slice'
import { toast } from 'react-toastify'

export const getTodos =
	(limit: number, page: number, status: string) => async (dispatch: any) => {
		dispatch(getTodosStart())
		try {
			const response = await instance.get('/todo', {
				params: {
					limit,
					page,
					status,
				},
			})
			dispatch(getTodosSuccess(response.data))
		} catch (error: any) {
			dispatch(getTodosFailure(error.message))
			toast.error(error.message)
		}
	}

export const createTodo =
	(title: string, description?: string, status?: string) =>
	async (dispatch: any) => {
		dispatch(addTodoStart())
		try {
			const response = await instance.post('/todo', {
				title,
				description,
				status,
			})
			dispatch(addTodoSuccess(response.data))
			toast.success('Task is Created!')
		} catch (error: any) {
			dispatch(addTodoFailure(error.message))
			toast.error(error.message)
		}
	}

export const changeTodo =
	(
		body: { title: string; description?: string; status?: string },
		id?: number,
	) =>
	async (dispatch: any) => {
		dispatch(editTodoStart())
		try {
			await instance.patch(`/todo/${id}`, {
				...body,
			})
			toast.success('Task is Updated!')
			dispatch(editTodoSuccess({ body, id }))
		} catch (error: any) {
			dispatch(editTodoFailure(error.message))
			toast.error(error.message)
		}
	}

export const deleteTodo = (id: number) => async (dispatch: any) => {
	dispatch(deleteTodoStart())
	try {
		await instance.delete(`/todo/${id}`)
		dispatch(deleteTodoSuccess(id))
		toast.success('Task is Deleted!')
	} catch (error: any) {
		dispatch(deleteTodoFailure(error.message))
		toast.error(error.message)
	}
}
