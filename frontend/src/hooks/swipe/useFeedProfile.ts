import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import type { IProfile, IProfileWithStats } from '@/types/auth'
import { useNextProfile } from './useNextProfile'

interface FeedState {
	currentProfile: IProfile | null
	isPending: boolean
	error: string | null
	totalViewed: number
}

export function useFeedProfile() {
	const queryClient = useQueryClient()
	const nextProfile = useNextProfile()

	const [feedState, setFeedState] = useState<FeedState>({
		currentProfile: null,
		isPending: true,
		error: null,
		totalViewed: 0,
	})

	const handleInteraction = useCallback(
		async (liked: boolean) => {
			const currentProfile = feedState.currentProfile
			if (!currentProfile) return

			setFeedState((prev) => ({
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
					queryClient.setQueryData(['user-profile', 'me'], (oldData: IProfileWithStats) => {
						if (!oldData) return oldData
						return {
							...oldData,
							matches: oldData.matches + 1,
						}
					})
				}

				setFeedState((prev) => ({
					...prev,
					currentProfile: data.nextProfile,
					totalViewed: prev.totalViewed + 1,
				}))
			} catch (error) {
				setFeedState((prev) => ({
					...prev,
					error: error instanceof Error ? error.message : 'Erro na interação',
				}))
			} finally {
				setFeedState((prev) => ({
					...prev,
					isPending: false,
				}))
			}
		},
		[feedState.currentProfile, nextProfile.mutateAsync, queryClient],
	)

	const handleRefresh = useCallback(async () => {
		setFeedState((prev) => ({
			...prev,
			isPending: true,
			error: null,
		}))

		try {
			const data = await nextProfile.mutateAsync({ targetId: null, like: null })
			setFeedState((prev) => ({
				...prev,
				currentProfile: data.nextProfile,
				error: null,
			}))
		} catch (error) {
			setFeedState((prev) => ({
				...prev,
				error: error instanceof Error ? error.message : 'erro ao atualizar',
			}))
		} finally {
			setFeedState((prev) => ({
				...prev,
				isPending: false,
			}))
		}
	}, [nextProfile.mutateAsync])

	const loadInitialProfile = useCallback(async () => {
		setFeedState((prev) => ({
			...prev,
			isPending: true,
			error: null,
		}))

		try {
			const data = await nextProfile.mutateAsync({ targetId: null, like: null })
			setFeedState((prev) => ({
				...prev,
				currentProfile: data.nextProfile,
			}))
		} catch (error) {
			setFeedState((prev) => ({
				...prev,
				error: error instanceof Error ? error.message : 'Erro ao carregar',
			}))
		} finally {
			setFeedState((prev) => ({
				...prev,
				isPending: false,
			}))
		}
	}, [nextProfile.mutateAsync])

	return { feedState, handleInteraction, handleRefresh, loadInitialProfile }
}
