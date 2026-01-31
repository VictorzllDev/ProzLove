import { prisma } from '../lib/prisma'
import type { IPhotoRepository, ISavePhoto } from '../types/entities/photo.entity'

export class PhotoRepository implements IPhotoRepository {
	async save({ userId, url, isPrimary }: ISavePhoto): Promise<void> {
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
				url,
				isPrimary,
			},
		})
	}
}
