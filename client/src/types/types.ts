export interface ITodo {
	id: number
	title: string
	description: string
	createdAt: string
	updatedAt: string
	status: string
}

export interface ITodos {
	todos: ITodo[]
	page: number
	totalPages: number
}
