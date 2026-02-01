import { z } from 'zod'
import { userSchema } from './user.schema'

export const matchSchema = z.object({
	id: z.string(),
	user1Id: z.string(),
	user2Id: z.string(),
	chatId: z.string(),
	createdAt: z.date(),

	user1: userSchema.optional(),
	user2: userSchema.optional(),
})
