import { useQuery } from '@tanstack/react-query'
import { likesReceived } from '@/services/user/likes-received'

export function useLikesReceived() {
	return useQuery({
		queryKey: ['likes-received'],
		queryFn: likesReceived,
	})
}
