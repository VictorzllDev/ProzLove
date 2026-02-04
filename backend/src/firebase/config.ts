import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { env } from '../env'

if (getApps().length === 0) {
	initializeApp({
		credential: cert({
			clientEmail: env.CLIENT_EMAIL,
			privateKey: env.PRIVATE_KEY,
			projectId: env.PROJECT_ID,
		} as ServiceAccount),
		storageBucket: env.STORAGE_BUCKET,
	})
}

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
