import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/config'

export async function signInWithGoogle() {
	const { user } = await signInWithPopup(
		auth,
		new GoogleAuthProvider().setCustomParameters({ promp: 'select_account' }),
	)

	return user
}
