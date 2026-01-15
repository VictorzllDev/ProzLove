import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronDownIcon, Flame, Heart } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/_app/onboarding/')({
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
	name: z.string().min(2, {
		message: 'O nome deve ter pelo menos 2 caracteres.',
	}),
	birthday: z.date({
		message: 'Selecione uma data de nascimento valida.',
	}),
	gender: z.string({
		message: 'Selecione um gênero.',
	}),
})

export type OnboardingFormInputs = z.infer<typeof onboardingFormSchema>

function Onboarding() {
	const [open, setOpen] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<OnboardingFormInputs>({
		resolver: zodResolver(onboardingFormSchema),
		defaultValues: {
			name: undefined,
			birthday: undefined,
			gender: undefined,
		},
	})

	function onSubmit(values: OnboardingFormInputs) {
		console.log(values)
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
							<div className="h-1.5 flex-1 rounded-full bg-gray-200" />
							<div className="h-1.5 flex-1 rounded-full bg-gray-200" />
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="name" className="font-semibold text-gray-700 text-sm">
									Como você se chama?
								</Label>

								<Input id="name" placeholder="Seu primeiro nome" {...register('name')} />
								{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
							</div>

							<div className="space-y-2">
								<Label htmlFor="birthday" className="font-semibold text-gray-700 text-sm">
									Qual sua data de nascimento?
								</Label>
								<Controller
									control={control}
									name="birthday"
									render={({ field }) => (
										<Popover open={open} onOpenChange={setOpen}>
											<PopoverTrigger asChild>
												<Button variant="outline" id="date" className="w-48 justify-between font-normal">
													{field.value ? field.value.toLocaleDateString() : 'Select date'}
													<ChevronDownIcon />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto overflow-hidden p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													captionLayout="dropdown"
													onSelect={(date) => {
														field.onChange(date)
														setOpen(false)
													}}
												/>
											</PopoverContent>
										</Popover>
									)}
								/>

								{errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}
							</div>

							<div className="space-y-2">
								<Label htmlFor="gender" className="font-semibold text-gray-700 text-sm">
									Eu sou...
								</Label>
								<Controller
									control={control}
									name="gender"
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger id="gender">
												<SelectValue placeholder="Selecione seu gênero" />
											</SelectTrigger>
											<SelectContent className="rounded-xl">
												<SelectItem value="homem" className="py-3">
													Homem
												</SelectItem>
												<SelectItem value="mulher" className="py-3">
													Mulher
												</SelectItem>
												<SelectItem value="nao-binario" className="py-3" disabled>
													Não-binário
												</SelectItem>
												<SelectItem value="outro" className="py-3" disabled>
													Outro
												</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
								{errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
							</div>

							<Button
								type="submit"
								variant="default"
								className="h-12 w-full bg-linear-to-r from-rose-500 via-pink-500 to-orange-400 font-bold text-white hover:from-rose-600 hover:via-pink-600 hover:to-orange-500"
							>
								Continuar
							</Button>
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
