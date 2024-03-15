import { FC } from 'react'
import { Form } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { createTodo, changeTodo } from '../store/todo/todo.operation'
import { ITodo } from '../types/types'

interface ITodoForm {
	type: 'post' | 'patch'
	onClick: () => void
	todo?: ITodo
}

const TodoForm: FC<ITodoForm> = ({ type, onClick, todo }) => {
	const dispatch = useAppDispatch()
	const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const formDataObject: { [key: string]: any } = {}
		formData.forEach(function (value, key) {
			formDataObject[key] = value
		})
		if (type === 'post') {
			dispatch(
				createTodo(
					formDataObject.title,
					formDataObject.description,
					formDataObject.status,
				),
			)
		} else {
			console.log('change')
			dispatch(
				changeTodo(
					{
						title: formDataObject.title,
						description: formDataObject.description,
						status: formDataObject.status,
					},
					todo?.id,
				),
			)
		}

		onClick()
	}
	return (
		<>
			<Form
				onSubmit={handlerSubmit}
				className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5"
			>
				<label htmlFor="title">
					<small>Title</small>
					<input
						className="input w-full"
						type="text"
						name="title"
						placeholder="Title"
						required
						min={1}
						defaultValue={todo?.title}
					/>
				</label>
				<label htmlFor="description">
					<small>Description</small>
					<textarea
						className="input w-full resize-none h-[150px]"
						name="description"
						placeholder="Description"
						defaultValue={todo?.description}
					/>
				</label>
				<label htmlFor="status" className="grid">
					<small>Status</small>
					<select
						name="status"
						className="input border-slate-700"
						defaultValue={todo?.status}
					>
						<option className="bg-slate-900" value="pending">
							Pending
						</option>
						<option className="bg-slate-900" value="inprogress">
							In progress
						</option>
						<option className="bg-slate-900" value="completed">
							Completed
						</option>
					</select>
				</label>
				<div className="flex items-center gap-2">
					<button className="btn btn-green" type="submit">
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button className="btn btn-red" onClick={onClick}>
						Close
					</button>
				</div>
			</Form>
		</>
	)
}

export default TodoForm
