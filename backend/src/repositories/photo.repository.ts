import { prisma } from '../lib/prisma'
import type { IPhotoRepository, ISavePhoto } from '../types/entities/photo.entity'
import type { IPhoto } from '../types/entities/user.entity'

export class PhotoRepository implements IPhotoRepository {
	async save({ userId, filePath, url, isPrimary }: ISavePhoto): Promise<void> {
		await prisma.photo.updateMany({
			where: {
				userId,
				isPrimary: true,
			},
			data: {
				isPrimary: false,
			},
		})

		await prisma.photo.create({
			data: {
				userId,
				filePath,
				url,
				isPrimary,
			},
		})
	}

	async findByIsPrimary(userId: string): Promise<IPhoto | null> {
		return await prisma.photo.findFirst({
			where: {
				userId,
				isPrimary: true,
			},
		})
	}

	async deleteById(id: string): Promise<void> {
		await prisma.photo.delete({
			where: {
				id,
			},
		})
	}
}
