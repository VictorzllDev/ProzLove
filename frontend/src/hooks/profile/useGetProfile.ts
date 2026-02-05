import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/services/profile/get-profile'
import { useAuth } from '../auth/useAuth'

export function useGetProfile(userId: string) {
	const { profile, isProfileLoading } = useAuth()

	const isOwnProfile = userId === 'me' || userId === profile?.id

	const query = useQuery({
		queryKey: ['user-profile', userId],
		queryFn: async () => {
			if (isOwnProfile) {
				if (!profile) {
					throw new Error('Unauthenticated user')
				}
				return await getProfile()
			}

			if (!userId) {
				throw new Error('User ID is required')
			}

			return await getProfile({ id: userId })
		},
		enabled: !!userId || !!profile?.id,
		retry: (failureCount, error) => {
			if (isOwnProfile || error.message.includes('404')) {
				return false
			}
			return failureCount < 2
		},
	})

	return {
		...query,
		data: query.data,
		isLoading: query.isLoading || (isOwnProfile && isProfileLoading),
		isOwnProfile,
	}
}
