interface IHeader {
	totalViewed: number
}

export function Header({ totalViewed }: IHeader) {
	return (
		<header className="mb-6 flex items-center justify-between">
			<div>
				<h1 className="font-bold text-2xl">Feed</h1>
				<p className="text-gray-500 text-sm">Visualizados: {totalViewed}</p>
			</div>
		</header>
	)
}
