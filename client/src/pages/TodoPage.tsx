import { FC, useState, useEffect } from 'react'
import Filter from '../components/Filter'
import Modal from '../components/modal/Modal'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getTodos, deleteTodo } from '../store/todo/todo.operation'
import ReactPaginate from 'react-paginate'
import { ITodo } from '../types/types'
import {
	selectTodos,
	totalPages,
	isLoading,
} from '../store/todo/todo.selectors'
import Table from '../components/Table'
import TodoForm from '../components/Todo.Form'
import { Grid } from 'react-loader-spinner'

const TodoPage: FC = () => {
	const [visibleModal, setVisibleModal] = useState(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [status, setStatus] = useState<string>('all')
	const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null)

	const dispatch = useAppDispatch()
	const loading = useAppSelector(isLoading)
	const totalP = useAppSelector(totalPages)
	const todos = useAppSelector(selectTodos)

	const limit = 5

	useEffect(() => {
		dispatch(getTodos(limit, currentPage, status))
	}, [dispatch, currentPage, status])

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}
	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodo(id))
	}
	const handleEditTodo = (it: ITodo) => {
		setCurrentTodo(it)
		setVisibleModal(!visibleModal)
	}
	const handleSetStatus = (value: string) => {
		setStatus(value)
		setCurrentPage(1)
	}

	const handleModal = () => {
		if (visibleModal) {
			setCurrentTodo(null)
		}
		setVisibleModal(!visibleModal)
	}

	return (
		<>
			<Filter
				active={status}
				modalClick={handleModal}
				statusClick={handleSetStatus}
			/>
			<ReactPaginate
				className="flex gap-3 justify-end mt-4 items-center"
				activeClassName="bg-blue-600 rounded-md"
				pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
				previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				nextClassName="ext-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="text-slate-600 cursor-not-allowed"
				pageCount={totalP}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handlePageChange}
			/>
			{loading ? (
				<div className="fixed bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center">
					<Grid
						visible={true}
						height="80"
						width="80"
						color="grey"
						ariaLabel="grid-loading"
						radius="12.5"
						wrapperStyle={{}}
						wrapperClass="grid-wrapper"
					/>
				</div>
			) : (
				<Table todo={todos!} edit={handleEditTodo} del={handleDeleteTodo} />
			)}
			{visibleModal && (
				<Modal>
					<TodoForm
						type={currentTodo ? 'patch' : 'post'}
						todo={currentTodo!}
						onClick={handleModal}
					/>
				</Modal>
			)}
		</>
	)
}

export default TodoPage
