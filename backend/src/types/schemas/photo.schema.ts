import { z } from 'zod'

export const photoSchema = z.object({
	id: z.string(),
	filePath: z.string(),
	url: z.string(),
	isPrimary: z.boolean(),
	userId: z.string(),
	createdAt: z.date(),
})

export const savePhotoSchema = photoSchema.pick({
	filePath: true,
	url: true,
	isPrimary: true,
	userId: true,
})
