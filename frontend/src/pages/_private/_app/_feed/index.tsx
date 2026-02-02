import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import EmptyList from '@/components/shared/empty-list'
import { LoadingSplash } from '@/components/shared/splash'
import { Button } from '@/components/ui/button'
import { useFeedProfile } from '@/hooks/discovery/useFeedProfile'
import { Header } from './-components/header'
import { ProfileCard } from './-components/profile-card'

export const Route = createFileRoute('/_private/_app/_feed/')({
	component: Feed,
})

function Feed() {
	const { isError, error, isPending, feedState, handleInteraction, handleRefresh, loadInitialProfile } =
		useFeedProfile()

	const handleLike = () => handleInteraction(true)
	const handleDislike = () => handleInteraction(false)

	useEffect(() => {
		loadInitialProfile()
	}, [loadInitialProfile])

	if (isPending) {
		return <LoadingSplash />
	}

	if (isError) {
		return (
			<div className="container mx-auto max-w-md p-4">
				<div className="rounded-lg bg-red-50 p-4 text-red-800">
					<h4 className="font-medium">{error.name}</h4>
					<p>{error.message}</p>
					<Button onClick={handleRefresh} variant="outline" className="mt-2">
						Tentar novamente
					</Button>
				</div>
			</div>
		)
	}

	if (!feedState.currentProfile) {
		return (
			<EmptyList
				type="search"
				title="Nenhum perfil disponível"
				description="Não há mais perfis para visualizar no momento"
				actionButton={{
					label: 'Buscar Novos Perfis',
					onClick: handleRefresh,
				}}
			/>
		)
	}

	return (
		<div className="container mx-auto max-w-md p-4">
			<Header totalViewed={feedState.totalViewed} />

			<ProfileCard
				profile={feedState.currentProfile}
				onRefresh={handleRefresh}
				onLike={handleLike}
				onDislike={handleDislike}
			/>
		</div>
	)
}
