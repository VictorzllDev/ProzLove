import { createFileRoute, Link } from '@tanstack/react-router'
import EmptyList from '@/components/shared/empty-list'
import { LoadingSplash } from '@/components/shared/splash'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { useMatches } from '@/hooks/firestore/useMatches'
import { getInitials } from '@/utils/getInitials.util'
import { Verified } from 'lucide-react'

export const Route = createFileRoute('/_private/_app/_tabs/chats/')({
	component: Chat,
})

function Chat() {
	const { profile } = useAuth()
	const { isLoading, matches } = useMatches({ userId: profile?.id || '' })

	if (!profile || isLoading) {
		return <LoadingSplash />
	}

	if (!Array.isArray(matches) || matches.length === 0) {
		return <EmptyList type="messages" />
	}

	return (
		<div className="container mx-auto mb-12 max-w-lg p-4">
			<header className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="font-bold text-2xl">Somente para você</h1>
					<p className="text-gray-500 text-sm">Perfils: {matches.length}</p>
				</div>
			</header>

			<div className="space-y-4">
				{matches.map((match) => (
					<div key={match.id} className="mb-6 rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl">
						<Link to="/chats/$id" params={{ id: match.id }} className="group relative shrink-0">
							<div className="items-ceter flex gap-4">
								<div className="relative">
									<Avatar className="h-16 w-16">
										<AvatarImage src={match.user.photoUrl} />
										<AvatarFallback className="text-2xl">{getInitials(match.user.name)}</AvatarFallback>
									</Avatar>
									<div className="absolute inset-0 rounded-full bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
								</div>

								<div className="flex min-w-0 items-center">
									<div className="mb-2 flex items-center justify-between">
										<div className="flex min-w-0 items-center gap-1">
											<h2 className="truncate font-bold text-gray-900 text-lg transition-colors group-hover:text-blue-600">
												{match.user.name}
											</h2>
											{profile.verified && (
												<div className="shrink-0 rounded-full bg-primary p-1">
													<Verified className="h-4 w-4 text-primary-foreground" />
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
