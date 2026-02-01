import { Heart, Inbox, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

interface EmptyListProps {
	/**
	 * Tipo de lista vazia para determinar ícone e mensagem padrão
	 * @default 'generic'
	 */
	type?: 'matches' | 'favorites' | 'messages' | 'search' | 'generic'

	/**
	 * Título customizado (sobrescreve o padrão)
	 */
	title?: string

	/**
	 * Descrição customizada (sobrescreve a padrão)
	 */
	description?: string

	/**
	 * Ícone customizado (sobrescreve o padrão)
	 */
	icon?: ReactNode

	/**
	 * Botão de ação principal
	 */
	actionButton?: {
		label: string
		onClick: () => void
		variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive'
	}

	/**
	 * Botão secundário (opcional)
	 */
	secondaryButton?: {
		label: string
		onClick: () => void
		variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive'
	}

	/**
	 * Classes CSS customizadas para o container
	 */
	className?: string

	/**
	 * Adiciona borda ao componente
	 */
	bordered?: boolean

	/**
	 * Adiciona background ao componente
	 */
	withBackground?: boolean
}

/**
 * Configurações padrão para diferentes tipos de lista vazia
 */
const DEFAULT_CONFIGS = {
	matches: {
		title: 'Nenhum Match Ainda',
		description: 'Continue explorando perfis para encontrar alguém especial.',
		icon: <Heart className="h-12 w-12 text-pink-500" />,
	},
	favorites: {
		title: 'Sem Favoritos',
		description: 'Você ainda não adicionou ninguém aos favoritos.',
		icon: <Heart className="h-12 w-12 text-rose-400" />,
	},
	messages: {
		title: 'Sem Mensagens',
		description: 'Suas conversas aparecerão aqui quando alguém enviar uma mensagem.',
		icon: <Inbox className="h-12 w-12 text-blue-500" />,
	},
	search: {
		title: 'Nenhum Resultado Encontrado',
		description: 'Tente ajustar seus filtros para encontrar o que está procurando.',
		icon: <Search className="h-12 w-12 text-gray-400" />,
	},
	generic: {
		title: 'Lista Vazia',
		description: 'Não há itens para exibir neste momento.',
		icon: <Inbox className="h-12 w-12 text-gray-400" />,
	},
}

/**
 * Componente de lista vazia responsivo e reutilizável
 *
 * @example
 * // Com tipo pré-configurado
 * <EmptyList type="matches" />
 *
 * @example
 * // Com customização completa
 * <EmptyList
 *   title="Nenhum usuário encontrado"
 *   description="Tente buscar com outros critérios"
 *   actionButton={{
 *     label: "Voltar",
 *     onClick: () => navigate(-1)
 *   }}
 *   bordered
 * />
 */
export function EmptyList({
	type = 'generic',
	title,
	description,
	icon,
	actionButton,
	secondaryButton,
	className = '',
	bordered = false,
	withBackground = false,
}: EmptyListProps) {
	const config = DEFAULT_CONFIGS[type]
	const finalTitle = title || config.title
	const finalDescription = description || config.description
	const finalIcon = icon || config.icon

	return (
		<Empty
			className={`w-full px-4 py-12 ${bordered ? 'border' : ''} 
        ${withBackground ? 'bg-muted/30' : ''} 
        ${className}
      `}
		>
			<EmptyHeader>
				<EmptyMedia>{finalIcon}</EmptyMedia>
				<EmptyTitle className="text-balance">{finalTitle}</EmptyTitle>
				<EmptyDescription className="text-balance">{finalDescription}</EmptyDescription>
			</EmptyHeader>

			{(actionButton || secondaryButton) && (
				<EmptyContent>
					<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
						{actionButton && (
							<Button onClick={actionButton.onClick} variant={actionButton.variant || 'default'}>
								{actionButton.label}
							</Button>
						)}
						{secondaryButton && (
							<Button onClick={secondaryButton.onClick} variant={secondaryButton.variant || 'outline'}>
								{secondaryButton.label}
							</Button>
						)}
					</div>
				</EmptyContent>
			)}
		</Empty>
	)
}

export default EmptyList
