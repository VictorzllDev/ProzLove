import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { onboarding } from '@/services/user/onboarding'

export function useOnboarding() {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: onboarding,
		onError: (error) => {
			console.log('Error ao realizar onboarding:', error)
			toast.error('Erro ao realizar onboarding!', {
				description: error.message,
			})
		},
		onSuccess: () => {
			toast.success('Onboarding realizado com sucesso!')
			navigate({ to: '/' })
		},
	})
}
