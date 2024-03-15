import { FC } from 'react'

interface IModal {
	children: JSX.Element
}

const Modal: FC<IModal> = ({ children }) => {
	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center bg-black/50">
			{children}
		</div>
	)
}

export default Modal
