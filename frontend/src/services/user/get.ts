import { apiPrivate } from '@/axios/apiPrivate'
import type { IProfile } from '@/types/auth'

interface IGetUser {
	id: string
}

export async function getUser({ id }: IGetUser): Promise<IProfile> {
	const { data } = await apiPrivate.get<IProfile>(`/user/profile/${id}`)
	return data
}
