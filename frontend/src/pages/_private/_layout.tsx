import { createFileRoute, Navigate, Outlet, useLocation } from '@tanstack/react-router'
import { Loading } from '@/components/shared/Loading'
import { useAuth } from '@/hooks/auth/useAuth'

export const Route = createFileRoute('/_private')({
	component: PrivateLayout,
})

function PrivateLayout() {
	const location = useLocation()
	const { isLoading, isAuthenticated, firestoreUser } = useAuth()

	if (isLoading || !firestoreUser) return <Loading />

	if (!isAuthenticated) return <Navigate to="/sign-in" replace />

	if (location.pathname === '/onboarding' && firestoreUser.completedOnboarding) return <Navigate to="/" replace />

	return <Outlet />
}
