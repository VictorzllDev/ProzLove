import type { IProfile } from './auth'

export interface IMatch {
	id: string
	user1Id: string
	user2Id: string
	chatId: string
	createdAt: Date

	user1?: IProfile
	user2?: IProfile
}

export interface ISwipe {
	nextProfile: IProfile | null
	match: IMatch | null
}
