import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { LogoSplash } from '@/components/shared/splash'
import { useAuth } from '@/contexts/AuthContext'

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	const { isLoading } = useAuth()

	if (isLoading) return <LogoSplash />

	return (
		<>
			<HeadContent />
			<Outlet />
		</>
	)
}
