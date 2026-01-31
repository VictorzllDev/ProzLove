import { z } from 'zod'
import { photoSchema } from './photo.schema'

export const jwtPayloadSchema = z.object({
	uid: z.string(),
	email: z.string(),
	iat: z.number(),
	exp: z.number(),
})

export const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	birthday: z.date(),
	gender: z.enum(['MALE', 'FEMALE']),
	bio: z.string(),
	photos: z.array(photoSchema),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export const saveUserSchema = userSchema.pick({
	id: true,
	name: true,
	birthday: true,
	gender: true,
	bio: true,
})
