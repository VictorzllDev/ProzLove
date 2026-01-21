import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'
import { Loading } from '@/components/shared/Loading'
import { useAuth } from '@/hooks/auth/useAuth'

export const Route = createFileRoute('/_private/_app')({
	component: AppLayout,
})

function AppLayout() {
	const { isLoading, firestoreUser } = useAuth()

	if (isLoading || !firestoreUser) return <Loading />

	if (!firestoreUser.completedOnboarding) return <Navigate to="/onboarding" replace />

	return (
		<>
			<Header />
			<Outlet />
			<BottomNav />
		</>
	)
}
