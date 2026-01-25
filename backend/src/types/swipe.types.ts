import type { IUser } from './user.types'

export interface ILike {
	id: string
	userId: string
	targetId: string
	createdAt: Date

	user?: IUser
	target?: IUser
}

export interface IDislike {
	id: string
	userId: string
	targetId: string
	createdAt: Date

	user?: IUser
	target?: IUser
}

export interface IMatch {
	id: string
	user1Id: string
	user2Id: string
	chatId: string
	createdAt: Date

	user1?: IUser
	user2?: IUser
}

export interface ISwipeResquestDTO {
	userId: string
	targetId: string | null
	like: boolean | null
}

export interface ISwipeResquest {
	userId: string
	targetId: string
	like: boolean
}

export interface ISwipeResponse {
	match?: IMatch | null
	nextProfile: IUser | null
}

export interface ISwipeUseCase {
	swipe(swipe: ISwipeResquestDTO): Promise<ISwipeResponse>
}

export interface ISwipeRepository {
	nextProfile(userId: string, targetId: string | null): Promise<IUser | null>
	like(userId: string, targetId: string): Promise<ILike>
	dislike(userId: string, targetId: string): Promise<IDislike>
	match(userId: string, targetId: string): Promise<IMatch | null>
	findLike(userId: string, targetId: string): Promise<ILike | null>
	findDislike(userId: string, targetId: string): Promise<IDislike | null>
	deleteLike(userId: string, targetId: string): Promise<void>
	deleteDislike(userId: string, targetId: string): Promise<void>
}
