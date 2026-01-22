import type { UseMutationResult } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiPrivate } from '@/axios/apiPrivate'
import { auth, db } from '@/firebase/config'
import { useLogout } from '@/hooks/auth/useLogout'
import { useSignIn } from '@/hooks/auth/useSignIn'
import { useSignUp } from '@/hooks/auth/useSignUp'
import type { ISignInWithEmail } from '@/services/auth/signInWithEmail'
import type { ISignUpWithEmail } from '@/services/auth/signUpWithEmail'
import type { IAuthUser, IFirestoreUser, IProfile } from '@/types/auth'

interface AuthContextType {
	authUser: IAuthUser | null
	firestoreUser: IFirestoreUser | null
	profile: IProfile | null
	isAuthenticated: boolean
	isLoading: boolean
	isAuthLoading: boolean
	isFirestoreLoading: boolean
	isProfileLoading: boolean
	signIn: UseMutationResult<IAuthUser, Error, ISignInWithEmail, unknown>
	signUp: UseMutationResult<IAuthUser, Error, ISignUpWithEmail, unknown>
	logout: UseMutationResult<void, Error, void, unknown>
	refreshProfile: () => Promise<void>
	profileError: Error | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para uso seguro do contexto
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider')
	}
	return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [authUser, setAuthUser] = useState<IAuthUser | null>(null)
	const [firestoreUser, setFirestoreUser] = useState<IFirestoreUser | null>(null)
	const [profile, setProfile] = useState<IProfile | null>(null)

	const [authLoading, setAuthLoading] = useState(true)
	const [firestoreLoading, setFirestoreLoading] = useState(true)
	const [profileLoading, setProfileLoading] = useState(true)
	const [profileError, setProfileError] = useState<Error | null>(null)

	// Função para buscar dados do backend
	const fetchUserProfile = useCallback(async (): Promise<IProfile | null> => {
		try {
			setProfileLoading(true)
			setProfileError(null)

			const response = await apiPrivate.get(`/user/profile`)

			if (!response.data) {
				// Se for 404, o perfil ainda não foi criado no backend
				if (response.status === 404) {
					return null
				}

				// Se for 401/403, o token pode estar expirado
				if (response.status === 401 || response.status === 403) {
					throw new Error('Sessão expirada. Por favor, faça login novamente.')
				}

				throw new Error(`Erro ao buscar perfil: ${response.status}`)
			}

			const data = await response.data
			return data as IProfile
		} catch (error) {
			console.warn('Erro ao buscar perfil do backend:', error)
			setProfileError(error instanceof Error ? error : new Error('Erro desconhecido ao buscar perfil'))
			return null
		} finally {
			setProfileLoading(false)
		}
	}, [])

	// Função para recarregar perfil manualmente
	const refreshProfile = useCallback(async () => {
		if (!authUser?.uid) {
			setProfile(null)
			return
		}

		const userProfile = await fetchUserProfile()
		setProfile(userProfile)
	}, [authUser?.uid, fetchUserProfile])

	// Efeito principal de autenticação
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setAuthUser(user)

				// Buscar perfil imediatamente quando o usuário fizer login
				try {
					const userProfile = await fetchUserProfile()
					setProfile(userProfile)
				} catch (error) {
					console.error('Erro ao buscar perfil na autenticação:', error)
				}
			} else {
				setAuthUser(null)
				setFirestoreUser(null)
				setProfile(null)
			}

			setAuthLoading(false)
		})
		return () => unsubscribe()
	}, [fetchUserProfile])

	// Efeito para Firestore
	useEffect(() => {
		if (!authUser?.uid) {
			setFirestoreUser(null)
			setFirestoreLoading(false)
			return
		}

		const userDocRef = doc(db, 'users', authUser.uid)

		const unsubscribe = onSnapshot(
			userDocRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.data()
					setFirestoreUser({
						completedOnboarding: data.completedOnboarding || false,
						...data,
					} as IFirestoreUser)
				} else {
					setFirestoreUser({
						completedOnboarding: false,
					} as IFirestoreUser)
				}
			},
			(error) => {
				console.error('Erro ao monitorar Firestore:', error)
				setFirestoreUser(null)
			},
			() => setFirestoreLoading(false),
		)

		return () => unsubscribe()
	}, [authUser?.uid])

	// Efeito para carregar perfil quando authUser mudar
	useEffect(() => {
		if (!authUser?.uid) {
			setProfile(null)
			setProfileLoading(false)
			return
		}

		// Carregar perfil quando authUser mudar
		const loadProfile = async () => {
			const userProfile = await fetchUserProfile()
			setProfile(userProfile)
		}

		loadProfile()
	}, [authUser?.uid, fetchUserProfile])

	// Atualizar isLoading geral
	const isLoading = useMemo(
		() => authLoading || firestoreLoading || profileLoading,
		[authLoading, firestoreLoading, profileLoading],
	)

	// Funções de autenticação com React Query
	const signIn = useSignIn({
		setAuthUser,
		setProfile,
		fetchUserProfile,
	})

	const signUp = useSignUp({
		setAuthUser,
		setProfile,
		fetchUserProfile,
	})

	const logout = useLogout({
		setAuthUser,
		setProfile,
		setProfileError,
	})

	const value = useMemo(
		() => ({
			authUser,
			firestoreUser,
			profile,
			isAuthenticated: !!authUser,
			isLoading,
			isAuthLoading: authLoading,
			isFirestoreLoading: firestoreLoading,
			isProfileLoading: profileLoading,
			signIn,
			signUp,
			logout,
			refreshProfile,
			profileError,
		}),
		[
			authUser,
			firestoreUser,
			profile,
			isLoading,
			authLoading,
			firestoreLoading,
			profileLoading,
			signIn,
			signUp,
			logout,
			refreshProfile,
			profileError,
		],
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
