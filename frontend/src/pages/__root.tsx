import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { Loading } from '@/components/shared/Loading'
import { useAuth } from '@/contexts/AuthContext'

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	const { isLoading } = useAuth()

	if (isLoading) return <Loading />

	return (
		<>
			<HeadContent />
			<Outlet />
		</>
	)
}
