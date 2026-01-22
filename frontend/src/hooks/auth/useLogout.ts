import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { logout } from '@/services/auth/logout'
import type { IAuthUser, IProfile } from '@/types/auth'

interface UseLogout {
	setAuthUser: (user: IAuthUser | null) => void
	setProfile: (profile: IProfile | null) => void
	setProfileError: (error: Error | null) => void
}

export function useLogout({ setAuthUser, setProfile, setProfileError }: UseLogout) {
	return useMutation({
		mutationFn: logout,
		onError: (error) => {
			console.log('Error ao realizar o logout:', error)
			toast.error('Erro ao realizar o logout!', {
				description: error.message,
			})
		},
		onSuccess: () => {
			setProfile(null)
			setProfileError(null)
			setAuthUser(null)
			toast('Até logo! Você saiu da sua conta.')
		},
	})
}
