import { z } from 'zod'

export const jwtPayloadSchema = z.object({
	uid: z.string(),
	email: z.string(),
	iat: z.number(),
	exp: z.number(),
})

export const photoSchema = z.object({
	id: z.string(),
	url: z.string(),
	isPrimary: z.boolean(),
	userId: z.string(),
	createdAt: z.date(),
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
