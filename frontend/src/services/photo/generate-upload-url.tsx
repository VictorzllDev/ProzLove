import { apiPrivate } from '@/axios/apiPrivate'

interface IGenerateUploadUrl {
	fileType: string
	isPrimary: boolean
}

interface IGenerateUploadUrlResponse {
	uploadUrl: string
	filePath: string
	imageUrl: string
}

export async function generateUploadUrl({ fileType, isPrimary }: IGenerateUploadUrl) {
	const { data } = await apiPrivate.post<IGenerateUploadUrlResponse>('/photo/generate-upload-url', {
		fileType,
		isPrimary,
	})

	return data
}
