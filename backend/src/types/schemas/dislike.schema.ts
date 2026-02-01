import { z } from 'zod'
import { userSchema } from './user.schema'

export const dislikeSchema = z.object({
	id: z.string(),
	userId: z.string(),
	targetId: z.string(),
	createdAt: z.date(),

	user: userSchema.optional(),
	target: userSchema.optional(),
})
