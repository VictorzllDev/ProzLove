import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/_app/profile/')({
	component: Profile,
})

function Profile() {
	return <Navigate to="/profile/$userId" params={{ userId: 'me' }} />
}
