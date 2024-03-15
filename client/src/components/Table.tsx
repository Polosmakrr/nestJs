import { FC } from 'react'
import { FaTrash, FaPen } from 'react-icons/fa'
import { ITodo } from '../types/types'

interface ITable {
	todo: ITodo[]
	edit: (value: ITodo) => void
	del: (value: number) => void
}
const Table: FC<ITable> = ({ todo, edit, del }) => {
	return (
		<div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
			{todo.length !== 0 ? (
				<table className="w-full">
					<thead>
						<td className="font-bold w-1/12 ">№</td>
						<td className="font-bold w-1/4 text-center">Title</td>
						<td className="font-bold w-3/4 text-center">Description</td>
						<td className="font-bold w-1/12">Status</td>
						<td className="font-bold text-center w-2/12">Action</td>
					</thead>
					<tbody>
						{todo.map((it, idx) => (
							<tr key={idx}>
								<td className={it.status}>{idx + 1}</td>
								<td className="px-2">{it.title}</td>
								<td className="px-2">{it.description}</td>
								<td className={it.status}>{it.status}</td>
								<td className="flex">
									<button
										className="btn hover:btn-green ml-auto"
										onClick={() => edit(it)}
									>
										<FaPen />
									</button>
									<button
										onClick={() => del(it.id)}
										className="btn hover:btn-red ml-auto"
									>
										<FaTrash />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="text-red-500 text-center font-bold">
					ToDo list is empty, let's create first!
				</p>
			)}
		</div>
	)
}

export default Table
