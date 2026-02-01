import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/_app/chats/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_app/chats/"!</div>
}
