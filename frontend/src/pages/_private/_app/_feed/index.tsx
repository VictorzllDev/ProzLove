import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNextProfile } from '@/hooks/swipe/useNextProfile'
import type { IProfile } from '@/types/auth'
import { Header } from './-components/header'
import { HeaderSkeleton } from './-components/header.skeleton'
import { ProfileCard } from './-components/profile-card'
import { ProfileCardSkeleton } from './-components/profile-card.skeleton'

export const Route = createFileRoute('/_private/_app/_feed/')({
	component: Feed,
})

interface FeedState {
	currentProfile: IProfile | null
	isPending: boolean
	error: string | null
	totalViewed: number
}

function Feed() {
	const nextProfile = useNextProfile()

	const [feedState, setFeedState] = useState<FeedState>({
		currentProfile: null,
		isPending: true,
		error: null,
		totalViewed: 0,
	})

	const handleInteraction = async (liked: boolean) => {
		const currentProfile = nextProfile.data?.nextProfile
		if (!currentProfile) return

		try {
			const data = await nextProfile.mutateAsync({
				targetId: currentProfile.id,
				like: liked,
			})

			if (data.match) {
				alert(`Match! ChatId: ${data.match.chatId}`)
			}

			setFeedState((prev) => ({
				...prev,
				currentProfile: data.nextProfile,
				totalViewed: prev.totalViewed + 1,
				error: null,
			}))
		} catch (error) {
			setFeedState((prev) => ({
				...prev,
				error: error instanceof Error ? error.message : 'Erro na interação',
			}))
		}
	}

	const handleLike = () => handleInteraction(true)
	const handleDislike = () => handleInteraction(false)

	const handleRefresh = async () => {
		try {
			const data = await nextProfile.mutateAsync({ targetId: null, like: null })
			setFeedState((prev) => ({
				...prev,
				currentProfile: data.nextProfile,
				isPending: false,
				error: null,
			}))
		} catch (error) {
			setFeedState((prev) => ({
				...prev,
				isPending: false,
				error: error instanceof Error ? error.message : 'Erro ao atualizar',
			}))
		}
	}

	// Efeito para carregar perfil inicial
	useEffect(() => {
		const loadInitialProfile = async () => {
			try {
				const data = await nextProfile.mutateAsync({ targetId: null, like: null })
				setFeedState((prev) => ({
					...prev,
					currentProfile: data.nextProfile,
					isPending: false,
				}))
			} catch (error) {
				setFeedState((prev) => ({
					...prev,
					isPending: false,
					error: error instanceof Error ? error.message : 'Erro ao carregar',
				}))
			}
		}

		loadInitialProfile()
	}, [nextProfile.mutateAsync])

	// Loading state
	if (feedState.isPending) {
		return (
			<div className="container mx-auto max-w-md p-4">
				<HeaderSkeleton />
				<ProfileCardSkeleton />
			</div>
		)
	}

	// Error state
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

	// Empty state
	if (!feedState.currentProfile) {
		return (
			<div className="p-8 text-center">
				<h3 className="mb-2 font-medium text-lg">Nenhum perfil disponível</h3>
				<p className="mb-4 text-gray-600">Não há mais perfis para visualizar no momento.</p>
				<Button onClick={handleRefresh}>Atualizar</Button>
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
				isPending={feedState.isPending}
			/>
		</div>
	)
}
