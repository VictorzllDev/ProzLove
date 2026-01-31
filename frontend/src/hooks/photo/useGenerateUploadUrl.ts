import { useMutation } from '@tanstack/react-query'
import { generateUploadUrl } from '@/services/photo/generate-upload-url'

export function useGenerateUploadUrl() {
	return useMutation({
		mutationFn: generateUploadUrl,
		onError: (error) => {
			console.log('Error generating upload URL:', error)
		},
	})
}
