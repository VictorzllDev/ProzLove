import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/firebase/config'
import type { IMatchFirestore } from '@/types/firestore'

export interface IUseMatches {
	userId: string
}

export function useMatches({ userId }: IUseMatches) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const [matches, setMatches] = useState<IMatchFirestore[]>([])

	useEffect(() => {
		setIsLoading(true)
		setError(null)

		const matchesCollectionRef = collection(db, 'users', userId, 'matches')
		const matchesQuery = query(matchesCollectionRef, orderBy('updatedAt', 'desc'), limit(100))
		const unsubscribeMatches = onSnapshot(
			matchesQuery,
			(snapshot) => {
				const matches = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as IMatchFirestore[]

				setMatches(matches)
				setIsLoading(false)
			},
			(err) => {
				console.error('Erro ao monitorar matches:', err)
				setError(err)
				setMatches([])
				setIsLoading(false)
			},
		)

		return () => unsubscribeMatches()
	}, [userId])

	return {
		matches,
		isLoading,
		error,
	}
}
