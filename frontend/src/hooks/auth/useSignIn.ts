import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { signInWithEmail } from '@/services/auth/signInWithEmail'
import type { IAuthUser, IProfile } from '@/types/auth'

interface UseSignIn {
	setAuthUser: (user: IAuthUser | null) => void
	setProfile: (profile: IProfile | null) => void
	fetchUserProfile: () => Promise<IProfile | null>
}

export function useSignIn({ setAuthUser, setProfile, fetchUserProfile }: UseSignIn) {
	return useMutation({
		mutationFn: signInWithEmail,
		onError: (error) => {
			console.log('Erro ao realizar o login:', error)
			toast.error('Erro ao realizar o login!', {
				description: error.message,
			})
		},
		onSuccess: async (user) => {
			if (user?.uid) {
				const userProfile = await fetchUserProfile()
				setProfile(userProfile)
			}

			setAuthUser(user)
			toast('Login realizado com sucesso!')
		},
	})
}
