import { z } from 'zod'

export const generateUploadUrlInputSchema = z.object({
	fileType: z.enum(['image/jpeg', 'image/png']),
	isPrimary: z.boolean().default(false),
})

export const generateUploadUrlInputWithIdSchema = generateUploadUrlInputSchema.extend({
	userId: z.string(),
})

export const generateUploadUrlOutputSchema = z.object({
	uploadUrl: z.string(),
	filePath: z.string(),
	imageUrl: z.string(),
})
