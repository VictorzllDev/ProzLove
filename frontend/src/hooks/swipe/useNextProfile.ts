import { useMutation } from '@tanstack/react-query'
import { nextProfile } from '@/services/swipe/next-profile'

export function useNextProfile() {
	return useMutation({
		mutationFn: nextProfile,
		onError: (error) => {
			console.log('Error em Buscar Proximo Perfil:', error)
		},
	})
}
