import { createFileRoute } from '@tanstack/react-router'
import { LoadingSplash } from '@/components/shared/splash'
import { useAuth } from '@/hooks/auth/useAuth'
import { useChat } from '@/hooks/firestore/useChat'
import { useMessages } from '@/hooks/firestore/useMessages'
import { ChatHeader } from './-components/chat-header'
import { MessageInput } from './-components/message-input'
import { MessageList } from './-components/message-list'

export const Route = createFileRoute('/_private/_app/_screens/chats/$id')({
	component: Chat,
})

export function Chat() {
	const { profile } = useAuth()
	const { id } = Route.useParams()

	const { chat, isLoading: isChatLoading } = useChat(id)
	const { messages, isLoading: isMessagesLoading, sendMessage } = useMessages(id)

	const isLoading = isChatLoading || isMessagesLoading

	if (isLoading || !profile || !chat) {
		return <LoadingSplash />
	}

	const chattingWith = chat.user1.id === profile.id ? chat.user2 : chat.user1

	const handleSendMessage = (text: string) => {
		sendMessage(profile.id, text)
	}

	return (
		<>
			<ChatHeader user={chattingWith} />

			<MessageList messages={messages} currentUserId={profile.id} />

			<MessageInput onSend={handleSendMessage} />
		</>
	)
}
