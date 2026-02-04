import { useEffect, useRef } from 'react'
import type { IMessage } from '@/types/firestore'
import { MessageBubble } from './message-bubble'

interface MessageListProps {
	messages: IMessage[]
	currentUserId: string
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	return (
		<main className="flex flex-1 flex-col overflow-hidden">
			<div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto px-4 pt-4 pb-20 md:px-6">
				<div className="space-y-4">
					{messages.map((message) => (
						<MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === currentUserId} />
					))}
					<div ref={messagesEndRef} />
				</div>
			</div>
		</main>
	)
}
