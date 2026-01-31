import { apiPrivate } from '@/axios/apiPrivate'
import type { IProfileWithStats } from '@/types/auth'

interface IGetUser {
	id: string
}

export async function getUser({ id }: IGetUser): Promise<IProfileWithStats> {
	const { data } = await apiPrivate.get<IProfileWithStats>(`/user/profile/${id}`)
	return data
}
