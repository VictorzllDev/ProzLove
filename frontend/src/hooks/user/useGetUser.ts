import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/services/user/get'
import type { IProfile } from '@/types/auth'
import { useAuth } from '../auth/useAuth'

export function useGetUser(userId: string) {
	const { profile, isProfileLoading } = useAuth()

	const isOwnProfile = userId === 'me' || userId === profile?.id

	const query = useQuery<IProfile, Error>({
		queryKey: ['user-profile', userId],
		queryFn: async () => {
			if (isOwnProfile) {
				if (!profile) {
					throw new Error('Unauthenticated user')
				}
				return profile
			}

			if (!userId) {
				throw new Error('User ID is required')
			}

			return await getUser({ id: userId })
		},
		enabled: !!userId || !!profile?.id,
		staleTime: isOwnProfile ? 0 : 2 * 60 * 1000, // 2 minutes
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
