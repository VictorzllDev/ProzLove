import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { signUpWithEmail } from '@/services/auth/signUpWithEmail'
import type { IAuthUser, IProfile } from '@/types/auth'

interface UseSignUp {
	setAuthUser: (user: IAuthUser | null) => void
	setProfile: (profile: IProfile | null) => void
	fetchUserProfile: () => Promise<IProfile | null>
}

export function useSignUp({ setAuthUser, setProfile, fetchUserProfile }: UseSignUp) {
	return useMutation({
		mutationFn: signUpWithEmail,
		onError: (error) => {
			console.log('Erro ao realizar o cadastro:', error)
			toast.error('Erro ao realizar o cadastro!', {
				description: error.message,
			})
		},
		onSuccess: (user) => {
			if (user?.uid) {
				// Aguardar um pouco para garantir que o backend processou o cadastro
				setTimeout(async () => {
					const userProfile = await fetchUserProfile()
					setProfile(userProfile)
				}, 1000)
			}

			setAuthUser(user)
			toast('Conta criada! Explore agora seu painel.')
		},
	})
}
