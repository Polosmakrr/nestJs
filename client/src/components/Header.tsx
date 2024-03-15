import { FC } from 'react'
import { Link } from 'react-router-dom'
import { FaRocket, FaCode } from 'react-icons/fa'

const Header: FC = () => {
	return (
		<header className="flex items-center justify-between bg-slate-800 px-4 py-2 shadow-sm backdrop-blur-sm">
			<Link to="/">
				<FaRocket size={20} />
			</Link>
			<p className="text-m">ToDo Application</p>
			<Link to="https://github.com/Polosmakrr">
				<FaCode size={20} />
			</Link>
		</header>
	)
}

export default Header
