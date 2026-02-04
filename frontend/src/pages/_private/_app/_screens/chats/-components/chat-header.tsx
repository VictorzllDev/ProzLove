import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import type { IChatFirestore } from '@/types/firestore'
import { getInitials } from '@/utils/getInitials.util'
import { Route } from '../$id'

interface ChatHeaderProps {
	user: IChatFirestore['user1' | 'user2']
}

export function ChatHeader({ user }: ChatHeaderProps) {
	const { id } = Route.useParams()
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate({ to: '..' })
	}

	return (
		<header className="sticky top-0 z-40 border-border border-b bg-background/80 backdrop-blur-lg">
			<div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-2">
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" onClick={handleGoBack} aria-label="Voltar" className="hover:bg-muted">
						<ArrowLeft className="h-5 w-5" />
					</Button>

					<Link
						to="/profile/$userId"
						params={{ userId: user.id }}
						state={{ __tempKey: `/chats/${id}` }}
						className="flex items-center gap-2"
					>
						<Avatar className="h-8 w-8">
							<AvatarImage src={user.photoUrl} />
							<AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
						</Avatar>

						<span className="font-semibold text-lg">{user.name}</span>
					</Link>
				</div>
			</div>
		</header>
	)
}
