import { apiPrivate } from '@/axios/apiPrivate'
import type { ISwipe } from '@/types/swipe'

interface INextProfile {
	targetId: string | null
	like: boolean | null
}

export async function nextProfile({ targetId, like }: INextProfile) {
	const { data } = await apiPrivate.post<ISwipe>('/user/swipe/nextprofile', {
		targetId,
		like,
	})

	return data
}
