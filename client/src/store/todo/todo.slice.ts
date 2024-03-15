import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITodos, ITodo } from '../../types/types'

interface TodoState {
	todos: ITodo[]
	loading: boolean
	error: string | null
	page: number
	totalPages: number
}

const initialState: TodoState = {
	todos: [],
	page: 1,
	totalPages: 1,
	loading: false,
	error: null,
}

export const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		getTodosStart: (state) => {
			state.loading = true
			state.error = null
		},
		getTodosSuccess: (state, action: PayloadAction<ITodos>) => {
			state.loading = false
			state.todos = action.payload.todos
			state.page = action.payload.page
			state.totalPages = action.payload.totalPages
		},
		getTodosFailure: (state, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		addTodoStart: (state) => {
			state.loading = true
			state.error = null
		},
		addTodoSuccess: (state, action: PayloadAction<ITodo>) => {
			state.loading = false
			state.todos.unshift(action.payload)
		},
		addTodoFailure: (state, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		editTodoStart: (state) => {
			state.loading = true
			state.error = null
		},
		editTodoSuccess: (state, action: PayloadAction<ITodo>) => {
			state.loading = false
			console.log('action.payload', action.payload)
			state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, ...action.payload.body }
				}
				return todo
			})
		},
		editTodoFailure: (state, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		deleteTodoStart: (state) => {
			state.loading = true
			state.error = null
		},
		deleteTodoSuccess: (state, action: PayloadAction<number>) => {
			state.loading = false
			state.todos = state.todos.filter((item) => item.id !== action.payload)
		},
		deleteTodoFailure: (state, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export const {
	getTodosStart,
	getTodosSuccess,
	getTodosFailure,
	addTodoStart,
	addTodoSuccess,
	addTodoFailure,
	editTodoSuccess,
	editTodoFailure,
	editTodoStart,
	deleteTodoStart,
	deleteTodoSuccess,
	deleteTodoFailure,
} = todoSlice.actions

export default todoSlice.reducer
