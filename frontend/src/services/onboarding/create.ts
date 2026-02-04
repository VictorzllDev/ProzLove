import { apiPrivate } from '@/axios/apiPrivate'

interface IOnboarding {
	name: string
	birthday: Date
	gender: string
	location: string
	bio: string
}

export async function createOnboarding({ name, birthday, gender, location, bio }: IOnboarding) {
	return apiPrivate.post('/user/onboarding', {
		name,
		birthday: birthday.toISOString(),
		gender,
		location,
		bio,
	})
}
