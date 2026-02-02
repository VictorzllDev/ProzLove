import { apiPrivate } from '@/axios/apiPrivate'
import type { IProfileWithStats } from '@/types/auth'

export interface IGetProfileInput {
	id: string
}

export type IGetProfileOutput = IProfileWithStats

export async function getProfile(input?: IGetProfileInput): Promise<IGetProfileOutput> {
	const { data } = await apiPrivate.get<IGetProfileOutput>(`/user/profile/${input?.id || ''}`)
	return data
}
