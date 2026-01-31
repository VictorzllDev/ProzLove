import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useFeedProfile } from '@/hooks/swipe/useFeedProfile'
import { Header } from './-components/header'
import { ProfileCard } from './-components/profile-card'

export const Route = createFileRoute('/_private/_app/_feed/')({
	component: Feed,
})

function Feed() {
	const { feedState, handleInteraction, handleRefresh, loadInitialProfile } = useFeedProfile()

	const handleLike = () => handleInteraction(true)
	const handleDislike = () => handleInteraction(false)

	useEffect(() => {
		if (feedState.currentProfile) return
		loadInitialProfile()
	}, [feedState.currentProfile, loadInitialProfile])

	if (feedState.isPending) {
		return <Spinner className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
	}

	if (feedState.error) {
		return (
			<div className="container mx-auto max-w-md p-4">
				<div className="rounded-lg bg-red-50 p-4 text-red-800">
					<h4 className="font-medium">Erro</h4>
					<p>{feedState.error}</p>
					<Button onClick={handleRefresh} variant="outline" className="mt-2">
						Tentar novamente
					</Button>
				</div>
			</div>
		)
	}

	if (!feedState.currentProfile) {
		return (
			<div className="p-8 text-center">
				<h3 className="mb-2 font-medium text-lg">Nenhum perfil disponível</h3>
				<p className="mb-4 text-gray-600">Não há mais perfis para visualizar no momento.</p>
				<Button onClick={handleRefresh}>Buscar Novos Perfis</Button>
			</div>
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
