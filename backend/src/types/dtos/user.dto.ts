import { z } from 'zod'
import { userSchema } from '../schemas/user.schema'

export const createOnboardingInputSchema = z.object({
	name: z.string().trim().min(2, 'Name must have at least 2 characters').max(100, 'Very long name'),
	birthday: z.coerce.date().refine((date) => {
		const today = new Date()
		const minDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
		return date <= minDate
	}, 'You must be at least 17 years old'),
	gender: z.enum(['MALE', 'FEMALE']),
	bio: z.string().trim().min(1, 'Bio must have at least 1 characters').max(255, 'Very long bio'),
})

export const createOnboardingInputWithIdSchema = createOnboardingInputSchema.extend({
	id: z.string(),
})

export const updateOnboardingInputSchema = createOnboardingInputSchema.partial()

export const getUserInputSchema = z.object({
	id: z.string().optional(),
})

export const getUserOutputSchema = userSchema.extend({
	likes: z.number(),
	dislikes: z.number(),
	matches: z.number(),
})

export const getLikesReceivedOutputSchema = z.object({
	likes: z.array(userSchema),
})
