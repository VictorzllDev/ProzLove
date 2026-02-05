import { useMutation } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { signInWithGoogle } from '@/services/auth/signInWithGoogle'
import type { IAuthUser, IProfileWithStats } from '@/types/auth'

interface UseGoogleSignIn {
	setAuthUser: (user: IAuthUser | null) => void
	setProfile: Dispatch<SetStateAction<IProfileWithStats | null>>
	fetchUserProfile: () => Promise<IProfileWithStats | null>
}

export function useGoogleSignIn({ setAuthUser, setProfile, fetchUserProfile }: UseGoogleSignIn) {
	return useMutation({
		mutationFn: signInWithGoogle,
		onError: (error) => {
			console.log('Erro ao realizar o login com Google:', error)
			toast.error('Erro ao realizar o login! com Google', {
				description: error.message,
			})
		},
		onSuccess: async (user) => {
			if (user?.uid) {
				const userProfile = await fetchUserProfile()
				setProfile(userProfile)
			}

			setAuthUser(user)
			toast('Login com Google realizado com sucesso!')
		},
	})
}
