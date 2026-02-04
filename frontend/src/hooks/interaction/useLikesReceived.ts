import { useQuery } from '@tanstack/react-query'
import { likesReceived } from '@/services/interaction/likes-received'

export function useLikesReceived() {
	return useQuery({
		queryKey: ['likes-received'],
		queryFn: likesReceived,
	})
}
