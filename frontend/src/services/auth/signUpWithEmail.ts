import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'

export interface ISignUpWithEmail {
	email: string
	password: string
}

export async function signUpWithEmail({ email, password }: ISignUpWithEmail) {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)

	return user
}
