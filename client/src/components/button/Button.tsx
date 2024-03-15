import { FC } from 'react'

interface Props {
	name: string
	current: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: FC<Props> = ({ name, onClick, current }) => {
	return (
		<>
			<button
				onClick={onClick}
				className={
					name.toLocaleLowerCase() === current
						? 'flex p-2 max-w-fit items-center gap-2 text-white'
						: 'flex p-2 max-w-fit items-center gap-2 text-white/50 hover:text-white'
				}
			>
				{name}
			</button>
		</>
	)
}

export default Button
