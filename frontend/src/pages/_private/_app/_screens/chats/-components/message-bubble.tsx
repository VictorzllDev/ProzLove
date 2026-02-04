import { cn } from '@/lib/utils'
import type { IMessage } from '@/types/firestore'

interface MessageBubbleProps {
	message: IMessage
	isOwnMessage: boolean
}

function formatTime(date: Date): string {
	return date.toLocaleTimeString('pt-BR', {
		hour: '2-digit',
		minute: '2-digit',
	})
}

function SystemMessageBubble({ message }: { message: IMessage }) {
	return (
		<div className="fade-in my-2 flex animate-in justify-center duration-300">
			<div className="max-w-xs rounded-lg bg-muted/50 px-4 py-2 text-center sm:max-w-sm">
				<p className="wrap-break-word text-muted-foreground text-xs italic">{message.text}</p>
				<span className="mt-1 block text-[10px] text-muted-foreground/70">{formatTime(message.createdAt)}</span>
			</div>
		</div>
	)
}

function UserMessageBubble({ message, isOwnMessage }: { message: IMessage; isOwnMessage: boolean }) {
	return (
		<div
			className={cn(
				'fade-in slide-in-from-bottom-2 flex animate-in gap-2 duration-300',
				isOwnMessage ? 'justify-end' : 'justify-start',
			)}
		>
			<div
				className={cn(
					'group relative flex flex-col rounded-2xl px-4 py-3',
					'wrap-break-word text-wrap break-all',
					'min-w-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl',
					isOwnMessage
						? 'rounded-br-none bg-linear-to-br from-primary to-accent text-white shadow-md'
						: 'rounded-bl-none border border-border/40 bg-background/95 text-foreground shadow-sm',
				)}
			>
				<p
					className={cn(
						'text-sm leading-relaxed',
						'whitespace-pre-wrap',
						'overflow-wrap-anywhere',
						'hyphens-auto',
						isOwnMessage ? 'text-white' : 'text-foreground',
					)}
				>
					{message.text}
				</p>

				<span
					className={cn('mt-2 self-end text-xs opacity-70', isOwnMessage ? 'text-white/70' : 'text-muted-foreground')}
				>
					{formatTime(message.createdAt)}
				</span>
			</div>
		</div>
	)
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
	const isSystemMessage = message.senderId === 'system'

	if (isSystemMessage) {
		return <SystemMessageBubble message={message} />
	}

	return <UserMessageBubble message={message} isOwnMessage={isOwnMessage} />
}
