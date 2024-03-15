import { FC } from 'react'
import { FaPlus } from 'react-icons/fa'
import Button from './button/Button'

interface Props {
	modalClick: () => void
	statusClick: (value: string) => void
	active: string
}

const Filter: FC<Props> = ({ modalClick, statusClick, active }) => {
	const setValue = (e: React.MouseEvent<HTMLButtonElement>) => {
		statusClick(e.currentTarget.outerText.toLowerCase())
	}
	return (
		<div className="flex">
			<button
				className="flex p-2 max-w-fit items-center gap-2 text-white/50 hover:text-white"
				onClick={modalClick}
			>
				<FaPlus size={15} />
				New Task
			</button>
			<Button current={active} onClick={setValue} name="All" />
			<Button current={active} onClick={setValue} name="Pending" />
			<Button current={active} onClick={setValue} name="InProgress" />
			<Button current={active} onClick={setValue} name="Completed" />
		</div>
	)
}

export default Filter
