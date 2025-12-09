import { useState } from 'react'
import { Button } from './components/ui/button'

export function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="text-3xl text-red-500">Proz Love</h1>
			<Button onClick={() => setCount(count + 1)}>Count {count}</Button>
		</div>
	)
}
