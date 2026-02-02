import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ILikesReceivedOutput } from '@/services/interaction/likes-received'
import { toggleLike } from '@/services/interaction/toggle-like'
import type { IProfileWithStats } from '@/types/auth'

export function useToggleLike() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: toggleLike,
		onError: (error) => {
			console.log('Error toggling like:', error)
		},
		onSuccess: (data, variables) => {
			queryClient.setQueryData(['likes-received'], (oldData: ILikesReceivedOutput) => {
				if (!oldData) return oldData
				return { likes: oldData.likes.filter((user) => user.id !== variables.targetId) }
			})

			if (data.isMatch) {
				toast.success('Parabens! Você encontrou uma nova amizade!')
				queryClient.setQueryData(['user-profile', 'me'], (oldData: IProfileWithStats) => {
					if (!oldData) return oldData
					return {
						...oldData,
						matches: oldData.matches + 1,
					}
				})
			}
		},
	})
}
