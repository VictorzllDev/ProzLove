import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import serviceAccount from '../../credential.json'
import { env } from '../env'

if (getApps().length === 0) {
	initializeApp({
		credential: cert(serviceAccount as ServiceAccount),
		storageBucket: env.STORAGE_BUCKET,
	})
}

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
