import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import type { IProfile } from '@/types/auth'
import { useNextProfile } from './useNextProfile'

interface FeedState {
	currentProfile: IProfile | null
	isPending: boolean
	error: string | null
	totalViewed: number
}

export function useFeedProfile() {
	const nextProfile = useNextProfile()
	const [state, setState] = useState<FeedState>({
		currentProfile: null,
		isPending: true,
		error: null,
		totalViewed: 0,
	})

	const handleInteraction = useCallback(
		async (liked: boolean) => {
			const currentProfile = state.currentProfile
			if (!currentProfile) return

			setState((prev) => ({
				...prev,
				isPending: true,
				error: null,
			}))

			try {
				const data = await nextProfile.mutateAsync({
					targetId: currentProfile.id,
					like: liked,
				})

				if (data.match) {
					toast.success('Parabens! Você encontrou uma nova amizade!')
				}

				setState((prev) => ({
					...prev,
					currentProfile: data.nextProfile,
					totalViewed: prev.totalViewed + 1,
				}))
			} catch (error) {
				setState((prev) => ({
					...prev,
					error: error instanceof Error ? error.message : 'Erro na interação',
				}))
			} finally {
				setState((prev) => ({
					...prev,
					isPending: false,
				}))
			}
		},
		[state.currentProfile, nextProfile.mutateAsync],
	)

	const handleRefresh = useCallback(async () => {
		setState((prev) => ({
			...prev,
			isPending: true,
		}))

		try {
			const data = await nextProfile.mutateAsync({ targetId: null, like: null })
			setState((prev) => ({
				...prev,
				currentProfile: data.nextProfile,
				isPending: false,
				error: null,
			}))
		} catch (error) {
			setState((prev) => ({
				...prev,
				isPending: false,
				error: error instanceof Error ? error.message : 'erro ao atualizar',
			}))
		} finally {
			setState((prev) => ({
				...prev,
				isPending: false,
			}))
		}
	}, [nextProfile.mutateAsync])

	const loadInitialProfile = useCallback(async () => {
		try {
			const data = await nextProfile.mutateAsync({ targetId: null, like: null })
			setState((prev) => ({
				...prev,
				currentProfile: data.nextProfile,
				isPending: false,
			}))
		} catch (error) {
			setState((prev) => ({
				...prev,
				isPending: false,
				error: error instanceof Error ? error.message : 'Erro ao carregar',
			}))
		}
	}, [nextProfile.mutateAsync])

	return { state, handleInteraction, handleRefresh, loadInitialProfile }
}
