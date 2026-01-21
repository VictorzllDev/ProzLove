import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { Flame, Heart } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth/useAuth'
import { useOnboarding } from '@/hooks/user/useOnboarding'
import { StageOneForm } from './-form/StageOneForm'
import { StageTwoForm } from './-form/StageTwoForm'
import { Loading } from '@/components/shared/Loading'

export const Route = createFileRoute('/_private/onboarding/')({
	component: Onboarding,
	head: () => ({
		meta: [
			{
				title: 'onboarding | Proz Love',
			},
		],
	}),
})

const onboardingFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, {
			message: 'O nome deve ter pelo menos 2 caracteres.',
		})
		.max(100, 'Nome muito longo'),
	bio: z
		.string()
		.trim()
		.min(1, {
			message: 'A biografia deve ter pelo menos 1 caracteres.',
		})
		.max(255, { message: 'Biografia muito longa.' }),
	birthday: z
		.date({
			message: 'Selecione uma data de nascimento valida.',
		})
		.refine((date) => {
			const today = new Date()
			const minDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
			return date <= minDate
		}, 'Você deve ter pelo menos 17 anos'),
	gender: z.enum(['MALE', 'FEMALE'], {
		message: 'Selecione um Genero.',
	}),
})

export type OnboardingFormInputs = z.infer<typeof onboardingFormSchema>

function Onboarding() {
	const { mutate, isPending } = useOnboarding()

	const [stage, setStage] = useState<number>(1)

	const form = useForm<OnboardingFormInputs>({
		resolver: zodResolver(onboardingFormSchema),
		defaultValues: {
			name: undefined,
			bio: undefined,
			birthday: undefined,
			gender: undefined,
		},
	})

	function onSubmit(data: OnboardingFormInputs) {
		mutate(data)
	}

	async function handleNextStage() {
		let isValid = false

		switch (stage) {
			case 1:
				isValid = await form.trigger(['name', 'birthday', 'gender'])
				break
			case 2:
				isValid = await form.trigger('bio')
				break
			default:
				isValid = false
		}

		if (isValid) {
			setStage(stage + 1)
		}
	}

	return (
		<div className="flex min-h-screen flex-col bg-linear-to-br from-rose-500 via-pink-500 to-orange-400">
			<header className="flex items-center justify-center pt-12 pb-6">
				<div className="flex items-center gap-1">
					<Flame className="h-10 w-10 text-white" />
					<span className="font-extrabold text-2xl text-white tracking-tight">Proz Love</span>
				</div>
			</header>

			<main className="flex flex-1 items-start justify-center px-4 pb-8">
				<div className="w-full max-w-md">
					<div className="space-y-8 rounded-lg bg-white p-8 shadow-2xl">
						<div className="space-y-2 text-center">
							<h1 className="font-bold text-2xl text-gray-900">Crie seu perfil</h1>
							<p className="text-gray-500 text-sm">
								Precisamos de algumas informações para encontrar seu match perfeito
							</p>
						</div>

						<div className="flex items-center gap-2">
							<div className="h-1.5 flex-1 rounded-full bg-linear-to-r from-rose-500 to-orange-400" />
							<div
								className={`h-1.5 flex-1 rounded-full ${
									stage === 2 ? 'bg-linear-to-r from-orange-400 to-rose-500' : 'bg-gray-200'
								}`}
							/>
						</div>

						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{stage === 1 && <StageOneForm form={form} />}
							{stage === 2 && <StageTwoForm form={form} />}

							{stage === 2 ? (
								<Button
									type="submit"
									variant="default"
									isLoading={isPending}
									className="h-12 w-full bg-linear-to-r from-rose-500 via-pink-500 to-orange-400 font-bold text-white hover:from-rose-600 hover:via-pink-600 hover:to-orange-500"
								>
									Finalizar Perfil
								</Button>
							) : (
								<Button
									type="submit"
									onClick={handleNextStage}
									variant="default"
									className="h-12 w-full bg-linear-to-r from-rose-500 via-pink-500 to-orange-400 font-bold text-white hover:from-rose-600 hover:via-pink-600 hover:to-orange-500"
								>
									Continuar
								</Button>
							)}
						</form>

						<div className="flex justify-center">
							<Heart className="h-6 w-6 text-rose-400/50" />
						</div>
					</div>

					<p className="mt-6 px-4 text-center text-white/80 text-xs">
						Ao continuar, você concorda com nossos{' '}
						<Link to="." className="underline transition-colors hover:text-white">
							Termos
						</Link>{' '}
						e{' '}
						<Link to="." className="underline transition-colors hover:text-white">
							Política de Privacidade
						</Link>
					</p>
				</div>
			</main>
		</div>
	)
}
