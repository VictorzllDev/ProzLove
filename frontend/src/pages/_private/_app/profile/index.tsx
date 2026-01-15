import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/_app/profile/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_app/meets/perfil/"!</div>
}
