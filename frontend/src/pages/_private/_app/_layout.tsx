import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'

export const Route = createFileRoute('/_private/_app')({
	component: AppLayout,
})

function AppLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<BottomNav />
		</>
	)
}
