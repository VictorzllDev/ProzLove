import type { UseMutationResult } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { createContext, useEffect, useMemo, useState } from 'react'
import { auth, db } from '@/firebase/config'
import { useLogout } from '@/hooks/auth/useLogout'
import { useSignIn } from '@/hooks/auth/useSignIn'
import { useSignUp } from '@/hooks/auth/useSignUp'
import type { ISignInWithEmail } from '@/services/auth/signInWithEmail'
import type { ISignUpWithEmail } from '@/services/auth/signUpWithEmail'
import type { IAuthUser, IFirestoreUser } from '@/types/auth'

interface AuthContextType {
	authUser: IAuthUser | null
	firestoreUser: IFirestoreUser | null
	isAuthenticated: boolean
	isLoading: boolean
	signIn: UseMutationResult<IAuthUser, Error, ISignInWithEmail, unknown>
	signUp: UseMutationResult<IAuthUser, Error, ISignUpWithEmail, unknown>
	logout: UseMutationResult<void, Error, void, unknown>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [authUser, setAuthUser] = useState<IAuthUser | null>(null)
	const [firestoreUser, setFirestoreUser] = useState<IFirestoreUser | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [firestoreLoaded, setFirestoreLoaded] = useState(false)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setAuthUser(user)
			} else {
				setAuthUser(null)
				setFirestoreUser(null)
				setFirestoreLoaded(true)
			}
		})
		return () => unsubscribe()
	}, [])

	useEffect(() => {
		if (!authUser?.uid) {
			setFirestoreUser(null)
			setFirestoreLoaded(true)
			return
		}

		setFirestoreLoaded(false)

		const userDocRef = doc(db, 'users', authUser.uid)

		const unsubscribe = onSnapshot(
			userDocRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.data()
					setFirestoreUser({
						// id: snapshot.id,
						completedOnboarding: data.completedOnboarding || false,
						// chats: data.chats || [],
						...data,
					} as IFirestoreUser)
				} else {
					setFirestoreUser({
						// id: authUser.uid,
						completedOnboarding: false,
						// chats: [],
					} as IFirestoreUser)
				}
				setFirestoreLoaded(true)
			},
			(error) => {
				console.error('Erro ao monitorar Firestore:', error)
				setFirestoreUser(null)
				setFirestoreLoaded(true)
			},
		)

		// Retorna a função de cleanup
		return () => unsubscribe()
	}, [authUser?.uid]) // Dependência apenas do uid

	useEffect(() => {
		if (authUser === undefined) return

		if (authUser && !firestoreLoaded) return

		setIsLoading(false)
	}, [authUser, firestoreLoaded])

	const signIn = useSignIn({ setUser: setAuthUser })
	const signUp = useSignUp({ setUser: setAuthUser })
	const logout = useLogout({ setUser: setAuthUser })

	const value = useMemo(
		() => ({
			authUser,
			firestoreUser,
			isAuthenticated: !!authUser,
			isLoading,
			signIn,
			signUp,
			logout,
		}),
		[authUser, firestoreUser, isLoading, signIn, signUp, logout],
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
