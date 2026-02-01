import { apiPrivate } from '@/axios/apiPrivate'
import type { IProfile } from '@/types/auth'

export interface ILikesReceivedOutput {
	likes: IProfile[]
}

export async function likesReceived() {
	const { data } = await apiPrivate.get<ILikesReceivedOutput>('/user/likes/received')
	return data
}
