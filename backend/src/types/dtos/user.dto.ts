import { z } from 'zod'
import { matchSchema } from '../schemas/match.schema'
import { userSchema } from '../schemas/user.schema'

// Onboarding
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

// Get User
export const getUserInputSchema = z.object({
	id: z.string().optional(),
})

export const getUserOutputSchema = userSchema.extend({
	likes: z.number(),
	dislikes: z.number(),
	matches: z.number(),
})

// Swipe
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

// Get Likes Received
export const getLikesReceivedOutputSchema = z.object({
	likes: z.array(userSchema),
})
