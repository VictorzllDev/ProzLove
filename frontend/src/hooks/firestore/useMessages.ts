import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { db } from '@/firebase/config'
import type { IMessage } from '@/types/firestore'

export function useMessages(chatId: string) {
	const [messages, setMessages] = useState<IMessage[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		setIsLoading(true)
		setError(null)

		const messagesRef = collection(db, 'chats', chatId, 'messages')
		const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'), limit(100))

		const unsubscribe = onSnapshot(
			messagesQuery,
			(snapshot) => {
				const updatedMessages: IMessage[] = snapshot.docs.map((doc) => {
					const data = doc.data()
					return {
						id: doc.id,
						senderId: data.senderId,
						text: data.text,
						createdAt: data.createdAt?.toDate(),
					}
				})

				setMessages(updatedMessages)
				setIsLoading(false)
			},
			(err) => {
				console.error('Erro ao ouvir mensagens:', err)
				setError(err)
				setMessages([])
				setIsLoading(false)
			},
		)

		return unsubscribe
	}, [chatId])

	const sendMessage = useCallback(
		async (senderId: string, text: string) => {
			if (!text.trim()) return

			const messagesRef = collection(db, 'chats', chatId, 'messages')

			await addDoc(messagesRef, {
				senderId,
				text: text.trim(),
				createdAt: new Date(),
			})

			const matchesRef = doc(db, 'users', senderId, 'matches', chatId)

			await updateDoc(matchesRef, {
				updatedAt: new Date(),
			})
		},
		[chatId],
	)

	return { messages, isLoading, error, sendMessage }
}
