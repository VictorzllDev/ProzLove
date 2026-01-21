import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../../credential.json'

if (getApps().length === 0) {
	initializeApp({
		credential: cert(serviceAccount as ServiceAccount),
	})
}

export const auth = getAuth()
export const db = getFirestore()
