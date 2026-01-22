import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth/useAuth'

export const Route = createFileRoute('/_private/_app/_feed/')({
	component: Feed,
})

function Feed() {
	const { logout } = useAuth()

	return <Button onClick={() => logout.mutate()}>logout</Button>
}
