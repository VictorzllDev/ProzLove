import { z } from 'zod'
import { matchSchema } from '../schemas/swipe.schema'
import { userSchema } from '../schemas/user.schema'

export const swipeAndGetNextProfileInputSchema = z.object({
	targetId: z.string().or(z.null()).optional().default(null),
	like: z.boolean().or(z.null()).optional().default(null),
})

export const swipeAndGetNextProfileWithIdInputSchema = swipeAndGetNextProfileInputSchema.extend({
	userId: z.string(),
})

export const swipeAndGetNextProfileOutputSchema = z.object({
	match: matchSchema.or(z.null()).optional().default(null),
	nextProfile: userSchema.or(z.null()).optional().default(null),
})
