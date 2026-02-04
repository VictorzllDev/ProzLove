import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/firebase/config'
import type { IChatFirestore } from '@/types/firestore'

export function useChat(chatId: string) {
	const [chat, setChat] = useState<IChatFirestore | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		setIsLoading(true)
		setError(null)

		const chatDocRef = doc(db, 'chats', chatId)

		const unsubscribe = onSnapshot(
			chatDocRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.data()
					setChat({
						id: snapshot.id,
						user1: data.user1,
						user2: data.user2,
						createdAt: data.createdAt?.toDate(),
						updatedAt: data.updatedAt?.toDate(),
					})
				} else {
					setChat(null)
				}
				setIsLoading(false)
			},
			(err) => {
				console.error('Erro ao monitorar chat:', err)
				setError(err)
				setIsLoading(false)
			},
		)

		return unsubscribe
	}, [chatId])

	return { chat, isLoading, error }
}
