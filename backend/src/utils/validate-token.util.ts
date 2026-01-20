import { auth } from '../firebase/config'
import { HttpError } from './http-error.util'

export async function validateTokenUtil(token: string) {
	try {
		const decoded = await auth.verifyIdToken(token)
		return decoded
	} catch {
		throw new HttpError('Token inválido ou expirado', 401)
	}
}
