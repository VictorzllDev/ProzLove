import { apiPrivate } from '@/axios/apiPrivate'

interface IUpdateProfile {
	name: string
	birthday: Date
	location: string
	bio: string
}

export async function updateProfile({ name, birthday, location, bio }: IUpdateProfile) {
	return apiPrivate.put('/user/profile', {
		name,
		birthday: birthday.toISOString(),
		location,
		bio,
	})
}
