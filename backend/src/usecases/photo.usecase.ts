import { storage } from '../firebase/config'
import type {
	IGenerateUploadUrlInput,
	IGenerateUploadUrlOutput,
	IPhotoRepository,
	IPhotoUseCase,
} from '../types/entities/photo.entity'

export class PhotoUseCase implements IPhotoUseCase {
	constructor(private photoRepository: IPhotoRepository) {}

	async generateUploadUrl({ userId, fileType, isPrimary }: IGenerateUploadUrlInput): Promise<IGenerateUploadUrlOutput> {
		if (!isPrimary) throw new Error('Function not implemented')

		const bucket = storage.bucket()

		const filePath = `users/${userId}/profile/profile_${Date.now()}.${fileType.split('/')[1]}`
		const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`

		const isPhotoExists = await this.photoRepository.findByIsPrimary(userId)
		if (isPhotoExists) {
			await bucket.file(isPhotoExists.filePath).delete()
			await this.photoRepository.deleteById(isPhotoExists.id)
		}

		await this.photoRepository.save({
			userId,
			filePath,
			url: imageUrl,
			isPrimary,
		})

		const [uploadUrl] = await bucket.file(filePath).getSignedUrl({
			version: 'v4',
			action: 'write',
			expires: Date.now() + 15 * 60 * 1000, // 15 minutes
			contentType: fileType,
		})

		return { uploadUrl, filePath, imageUrl }
	}
}
