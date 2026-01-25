import type { User } from 'firebase/auth'

export interface IAuthUser extends User {}

export interface IFirestoreUser {
	completedOnboarding: boolean
}

export interface IProfile {
	id: string
	name: string
	birthday: Date
	gender: 'MALE' | 'FEMALE'
	bio: string
	createdAt: string
	updatedAt: string
}
