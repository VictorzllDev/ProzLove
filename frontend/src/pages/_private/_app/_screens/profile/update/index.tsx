import { createFileRoute, Link } from '@tanstack/react-router'
import { Flame, Heart } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { useProfileForm } from '@/hooks/profile/useProfileForm'
import { UpdateUserForm } from './-form/UpdateUserForm'

export const Route = createFileRoute('/_private/_app/_screens/profile/update/')({
	component: ProfileUpdate,
	head: () => ({
		meta: [
			{
				title: 'Atualizar Perfil | Proz Love',
			},
		],
	}),
})

function ProfileUpdate() {
	const { form, isPending, avatarUrl, setAvatarUrl, onSubmit } = useProfileForm()

	return (
		<div className="flex min-h-screen flex-col bg-linear-to-br from-rose-500 via-pink-500 to-orange-400">
			<Header showBackButton />

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
							<h1 className="font-bold text-2xl text-gray-900">Atualizar seu perfil</h1>
							<p className="text-gray-500 text-sm">
								Precisamos de algumas informações para encontrar seu match perfeito
							</p>
						</div>

						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<UpdateUserForm form={form} onAvatarChange={setAvatarUrl} defaultAvatar={avatarUrl} />

							<Button
								type="submit"
								variant="default"
								isLoading={isPending}
								className="h-12 w-full bg-linear-to-r from-rose-500 via-pink-500 to-orange-400 font-bold text-white hover:from-rose-600 hover:via-pink-600 hover:to-orange-500"
							>
								Finalizar Perfil
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
