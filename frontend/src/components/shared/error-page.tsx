import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function ErrorPage() {
	return (
		<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
			<div className="flex flex-col items-center justify-center px-4 py-8 text-center">
				<h2 className="mb-6 font-semibold text-5xl">Opa!</h2>
				<h3 className="mb-1.5 font-semibold text-3xl">Algo deu errado</h3>
				<p className="mb-6 max-w-sm text-muted-foreground">
					O Perfil que voc&ecirc; procurava n&atilde;o foi encontrado.
				</p>
				<Link to="/">
					<Button size="lg" className="rounded-lg text-base">
						Voltar para a p&aacute;gina inicial
					</Button>
				</Link>
			</div>

			<div className="relative max-h-screen w-full p-2 max-lg:hidden">
				<div className="h-full w-full rounded-2xl bg-black"></div>
				<img
					src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
					alt="404 illustration"
					className="absolute top-1/2 left-1/2 h-[clamp(260px,25vw,406px)] -translate-x-1/2 -translate-y-1/2"
				/>
			</div>
		</div>
	)
}
