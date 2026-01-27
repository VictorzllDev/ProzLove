import { z } from 'zod'
import { userSchema } from './user.schema'

export const likeSchema = z.object({
	id: z.string(),
	userId: z.string(),
	targetId: z.string(),
	createdAt: z.date(),

	user: userSchema.optional(),
	target: userSchema.optional(),
})

export const dislikeSchema = z.object({
	id: z.string(),
	userId: z.string(),
	targetId: z.string(),
	createdAt: z.date(),

	user: userSchema.optional(),
	target: userSchema.optional(),
})

export const matchSchema = z.object({
	id: z.string(),
	user1Id: z.string(),
	user2Id: z.string(),
	chatId: z.string(),
	createdAt: z.date(),

	user1: userSchema.optional(),
	user2: userSchema.optional(),
})
