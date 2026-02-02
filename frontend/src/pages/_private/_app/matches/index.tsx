import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { HeartIcon, XIcon } from 'lucide-react'
import EmptyList from '@/components/shared/empty-list'
import { LoadingSplash } from '@/components/shared/splash'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useLikesReceived } from '@/hooks/interaction/useLikesReceived'
import { useToggleLike } from '@/hooks/interaction/useToggleLike'
import { calculateAge } from '@/utils/calculate-age.util'
import { getInitials } from '@/utils/getInitials.util'

export const Route = createFileRoute('/_private/_app/matches/')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const { data, isPending } = useLikesReceived()
	const toggleLike = useToggleLike()

	const handleLike = (targetId: string) => {
		toggleLike.mutate({
			targetId,
			action: 'like',
		})
	}

	const handleDislike = (targetId: string) => {
		toggleLike.mutate({
			targetId,
			action: 'dislike',
		})
	}

	if (isPending) return <LoadingSplash />

	if (!Array.isArray(data?.likes) || data.likes.length === 0) {
		return (
			<EmptyList
				type="matches"
				actionButton={{
					label: 'Explorar Perfis',
					onClick: () => navigate({ to: '/' }),
				}}
			/>
		)
	}

	return (
		<div className="container mx-auto mb-12 max-w-lg p-4">
			<header className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="font-bold text-2xl">Somente para você</h1>
					<p className="text-gray-500 text-sm">Perfils: {data.likes.length}</p>
				</div>
			</header>

			<div className="space-y-4">
				{data.likes.map((profile) => (
					<div key={profile.id} className="mb-6 rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
						<div className="mb-6 flex items-start gap-4">
							<Link to="/profile/$userId" params={{ userId: profile.id }} className="group relative shrink-0">
								<div className="relative">
									<Avatar className="h-20 w-20">
										<AvatarImage src={profile.photos.find((p) => p.isPrimary)?.url} />
										<AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
									</Avatar>
									<div className="absolute inset-0 rounded-full bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
								</div>
							</Link>

							<div className="min-w-0 flex-1">
								<div className="mb-2 flex items-start justify-between">
									<div className="min-w-0">
										<Link to="/profile/$userId" params={{ userId: profile.id }} className="group">
											<h2 className="truncate font-bold text-gray-900 text-lg transition-colors group-hover:text-blue-600">
												{profile.name}
											</h2>
										</Link>

										<div className="flex items-center gap-3 text-gray-600">
											{profile.birthday && (
												<span className="font-medium text-sm">{calculateAge(String(profile.birthday))} anos</span>
											)}
										</div>
									</div>
								</div>

								{profile.bio && <p className="line-clamp-2 text-gray-700 text-sm leading-relaxed">{profile.bio}</p>}
							</div>
						</div>
						<div className="flex gap-3 border-gray-100 border-t pt-4">
							<Button
								variant="outline"
								onClick={() => handleDislike(profile.id)}
								className="flex h-12 flex-1 items-center justify-center gap-2 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
							>
								<XIcon className="h-5 w-5" />
								<span className="font-medium">Não Gostei</span>
							</Button>

							<Button
								onClick={() => handleLike(profile.id)}
								className="flex h-12 flex-1 items-center justify-center gap-2 bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-md transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-lg"
							>
								<HeartIcon className="h-5 w-5" />
								<span className="font-medium">Match!</span>
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
