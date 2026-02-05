import { useLocation, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'
import { env } from '@/env'
import { tabs } from './bottom-nav'

type TabType = 'feed' | 'matches' | 'chats' | 'profile' | 'default'
const tabTitles: Record<TabType, string> = {
	feed: 'Descobrir',
	matches: 'Meus Matches',
	chats: 'Conversas',
	profile: 'Perfil',
	default: 'Proz Love',
}

interface HeaderProps {
	showBackButton?: boolean
}

export function Header({ showBackButton }: HeaderProps) {
	const { logout } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const currentPath = location.pathname
	const activeTab = (tabs.find((tab) => tab.path === currentPath)?.id as TabType) || 'default'

	const handleBack = () => {
		navigate({ to: location.state?.__tempKey || '/' })
	}

	return (
		<header className="sticky top-0 z-40 border-border border-b bg-background/80 backdrop-blur-lg">
			<div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
				<div className="flex items-center gap-2">
					{showBackButton && (
						<Button variant="ghost" size="icon" onClick={handleBack} aria-label="Voltar" className="hover:bg-muted">
							<ArrowLeft className="h-5 w-5" />
						</Button>
					)}
					<div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg">
						<img src="/logo.svg" alt="Logo" className="h-full w-full" />
					</div>
					<span className="font-semibold text-lg">{tabTitles[activeTab]}</span>
				</div>

				<div className="flex items-center gap-1">
					<Button variant="ghost" size="icon" className="relative">
						<Bell className="h-5 w-5" />
						<span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<Settings className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-40" align="start">
							<DropdownMenuGroup>
								<a href="https://github.com/VictorzllDev/ProzLove" target="_blank" rel="noreferrer">
									<DropdownMenuItem>GitHub</DropdownMenuItem>
								</a>
								<DropdownMenuItem disabled>Support</DropdownMenuItem>
								<DropdownMenuItem>
									<a href={`${env.VITE_API_URL}/docs`} target="_blank" rel="noreferrer">
										API
									</a>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => logout.mutate()}>Sair</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
