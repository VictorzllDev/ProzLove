import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { nextProfile } from '@/services/discovery/next-profile'
import type { ILikesReceivedOutput } from '@/services/interaction/likes-received'
import type { IProfile, IProfileWithStats } from '@/types/auth'

interface IFeedState {
	currentProfile: IProfile | null
	totalViewed: number
}

export function useFeedProfile() {
	const queryClient = useQueryClient()
	const nextProfileMutation = useMutation({
		mutationKey: ['next-profile'],
		mutationFn: nextProfile,
		gcTime: 5 * 60 * 100, // 5 minutes
		onError: (error) => {
			console.log('Error em Buscar Proximo Perfil:', error)
		},
	})

	const [feedState, setFeedState] = useState<IFeedState>({
		currentProfile: null,
		totalViewed: 0,
	})

	const handleInteraction = useCallback(
		async (liked: boolean) => {
			const currentProfile = feedState.currentProfile
			if (!currentProfile) return

			const data = await nextProfileMutation.mutateAsync({
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
				queryClient.setQueryData(['likes-received'], (oldData: ILikesReceivedOutput) => {
					if (!oldData) return oldData
					return { likes: oldData.likes.filter((profile) => profile.id !== currentProfile.id) }
				})
			}

			setFeedState((prev) => ({
				...prev,
				currentProfile: data.nextProfile,
				totalViewed: prev.totalViewed + 1,
			}))
		},
		[feedState.currentProfile, nextProfileMutation.mutateAsync, queryClient],
	)

	const handleRefresh = useCallback(async () => {
		const data = await nextProfileMutation.mutateAsync({ targetId: null, like: null })
		setFeedState((prev) => ({
			...prev,
			currentProfile: data.nextProfile,
		}))
	}, [nextProfileMutation.mutateAsync])

	const loadInitialProfile = useCallback(async () => {
		if (feedState.currentProfile) return

		const data = await nextProfileMutation.mutateAsync({ targetId: null, like: null })
		setFeedState((prev) => ({
			...prev,
			currentProfile: data.nextProfile,
		}))
	}, [nextProfileMutation.mutateAsync, feedState.currentProfile])

	return { ...nextProfileMutation, feedState, handleInteraction, handleRefresh, loadInitialProfile }
}
