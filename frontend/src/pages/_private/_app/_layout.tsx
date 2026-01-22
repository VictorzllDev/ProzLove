import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/hooks/auth/useAuth'

export const Route = createFileRoute('/_private/_app')({
	component: AppLayout,
})

function AppLayout() {
	const { firestoreUser } = useAuth()

	if (!firestoreUser) return <Spinner className="mx-auto h-dvh" />

	if (!firestoreUser.completedOnboarding) return <Navigate to="/onboarding" replace />

	return (
		<>
			<Header />
			<Outlet />
			<BottomNav />
		</>
	)
}
