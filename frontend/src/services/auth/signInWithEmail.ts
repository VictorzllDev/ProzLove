import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'

export interface ISignInWithEmail {
	email: string
	password: string
}

export async function signInWithEmail({ email, password }: ISignInWithEmail) {
	const { user } = await signInWithEmailAndPassword(auth, email, password)

	return user
}
