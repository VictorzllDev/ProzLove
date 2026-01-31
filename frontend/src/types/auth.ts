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
	photos: IPhoto[]
	createdAt: string
	updatedAt: string
}

export interface IProfileWithStats extends IProfile {
	likes: number
	dislikes: number
	matches: number
}

export interface IPhoto {
	id: string
	url: string
	isPrimary: boolean
	userId: string
	createdAt: string
}
