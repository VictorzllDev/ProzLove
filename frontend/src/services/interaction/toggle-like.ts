import { apiPrivate } from '@/axios/apiPrivate'
import type { IMatch } from '@/types/swipe'

export interface IToggleLikeInput {
	targetId: string
	action: 'like' | 'dislike'
}

export interface IToggleLikeOutput {
	action: 'liked' | 'disliked'
	isMatch: boolean
	match: IMatch
}

export async function toggleLike({ targetId, action }: IToggleLikeInput): Promise<IToggleLikeOutput> {
	const { data } = await apiPrivate.post<IToggleLikeOutput>('/user/likes/toggle', {
		targetId,
		action,
	})

	return data
}
