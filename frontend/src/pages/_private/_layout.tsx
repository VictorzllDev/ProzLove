import { createFileRoute, Navigate, Outlet, useLocation } from '@tanstack/react-router'
import { useAuth } from '@/hooks/auth/useAuth'

export const Route = createFileRoute('/_private')({
	component: PrivateLayout,
})

function PrivateLayout() {
	const location = useLocation()
	const { isAuthenticated, firestoreUser } = useAuth()

	if (!isAuthenticated) return <Navigate to="/sign-in" replace />

	if (location.pathname === '/onboarding' && firestoreUser?.completedOnboarding) return <Navigate to="/" replace />

	return <Outlet />
}
