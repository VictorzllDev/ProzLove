import { useMutation } from '@tanstack/react-query'
import { getUser } from '@/services/user/get'

export function useGetUser() {
	return useMutation({
		mutationFn: getUser,
		onError: (error) => {
			console.log('Error em Buscar Perfil:', error)
		},
	})
}
