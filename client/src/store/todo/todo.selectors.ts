import type { RootState } from '../store'

export const selectTodos = (state: RootState) => state.todos.todos
export const isLoading = (state: RootState) => state.todos.loading
export const error = (state: RootState) => state.todos.error
export const page = (state: RootState) => state.todos.page
export const totalPages = (state: RootState) => state.todos.totalPages
