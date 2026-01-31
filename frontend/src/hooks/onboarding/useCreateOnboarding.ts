import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'
import { createOnboarding } from '@/services/onboarding/create'

export function useCreateOnboarding() {
	const navigate = useNavigate()
	const { refreshProfile } = useAuth()

	return useMutation({
		mutationFn: createOnboarding,
		onError: (error) => {
			console.log('Error ao realizar onboarding:', error)
			toast.error('Erro ao realizar onboarding!', {
				description: error.message,
			})
		},
		onSuccess: () => {
			toast.success('Onboarding realizado com sucesso!')
			refreshProfile()
			navigate({ to: '/' })
		},
	})
}
