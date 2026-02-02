import { apiPrivate } from '@/axios/apiPrivate'
import type { IProfile } from '@/types/auth'
import type { IMatch } from '@/types/match'

export interface INextProfileInput {
	targetId: string | null
	like: boolean | null
}

export interface INextProfileOutput {
	nextProfile: IProfile | null
	match: IMatch | null
}

export async function nextProfile({ targetId, like }: INextProfileInput) {
	const { data } = await apiPrivate.post<INextProfileOutput>('/user/swipe/nextprofile', {
		targetId,
		like,
	})

	return data
}
