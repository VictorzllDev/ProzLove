import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateProfile } from '@/services/profile/update-profile'
import type { IProfileWithStats } from '@/types/auth'

export function useUpdateProfile() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateProfile,
		onError: (error) => {
			console.log('Erro ao atualizar perfil:', error)
			toast.error('Erro ao atualizar perfil!', {
				description: error.message,
			})
		},
		onSuccess: async (_, variables) => {
			queryClient.setQueryData(['user-profile', 'me'], (oldData: IProfileWithStats) => {
				if (!oldData) return oldData
				return {
					...oldData,
					...variables,
				}
			})
		},
	})
}
