import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth/useAuth'

export const Route = createFileRoute('/_app/_feed/')({
	component: Feed,
})

function Feed() {
	const { user, logout } = useAuth()

	return (
		<>
			<div>Hello {user?.displayName} "/_app/feed/"!</div>
			<Button onClick={() => logout.mutate()}>logout</Button>
		</>
	)
}
