import { Link, useLocation } from '@tanstack/react-router'
import { Flame, type LucideProps, MessageCircle, User, Users } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ITabs {
	id: string
	label: string
	path: string
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
}

export const tabs: ITabs[] = [
	{ id: 'feed', label: 'Feed', path: '/', icon: Flame },
	{ id: 'meets', label: 'Meets', path: '/meets', icon: Users },
	{ id: 'chat', label: 'Chat', path: '/chat', icon: MessageCircle },
	{ id: 'profile', label: 'Perfil', path: '/profile/me', icon: User },
]

export function BottomNav() {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<nav className="fixed bottom-0 z-40 w-full border-border border-t bg-background">
			<div className="mx-auto flex h-16 max-w-md items-center justify-around">
				{tabs.map((tab) => {
					const Icon = tab.icon
					const isActive = tab.path === currentPath
					return (
						<Link
							key={tab.id}
							to={tab.path}
							className={cn(
								'flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors',
								isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
							)}
						>
							<Icon className={cn('h-6 w-6', isActive && 'fill-primary/20')} />
							<span className="font-medium text-xs">{tab.label}</span>
						</Link>
					)
				})}
			</div>
		</nav>
	)
}
