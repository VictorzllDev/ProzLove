import { apiPrivate } from '@/axios/apiPrivate'
import type { IProfileWithStats } from '@/types/auth'

interface IGetUserInput {
	id: string
}
export async function getUser(input?: IGetUserInput): Promise<IProfileWithStats> {
	const { data } = await apiPrivate.get<IProfileWithStats>(`/user/profile/${input?.id || ''}`)
	return data
}
