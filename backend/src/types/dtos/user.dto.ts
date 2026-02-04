import { z } from 'zod'
import { matchSchema } from '../schemas/match.schema'
import { userSchema } from '../schemas/user.schema'

// INPUT - ONBOARDING
export const createOnboardingInputSchema = z.object({
	name: z.string().trim().min(2, 'Name must have at least 2 characters').max(100, 'Very long name'),
	birthday: z.coerce.date().refine((date) => {
		const today = new Date()
		const minDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
		return date <= minDate
	}, 'You must be at least 17 years old'),
	gender: z.enum(['MALE', 'FEMALE']),
	bio: z.string().trim().min(1, 'Bio must have at least 1 characters').max(255, 'Very long bio'),
	location: z.enum([
		'Belo Horizonte - MG',
		'Uberlandia - MG',
		'Montes Claros - MG',
		'Juiz de Fora - MG',
		'Divinopolis - MG',
		'Contagem - MG',
		'Itaquera - SP',
		'São Miguel Paulista - SP',
		'Santo Amaro - SP',
		'Sacomã - SP',
		'Mauá - SP',
		'Jabaquara - SP',
		'Guarulhos - SP',
		'Guaianases - SP',
		'Grajaú - SP',
		'Diadema - SP',
		'Carapicuíba - SP',
	]),
})

export const createOnboardingInputWithIdSchema = createOnboardingInputSchema.extend({
	id: z.string(),
})

export const updateOnboardingInputSchema = createOnboardingInputSchema.partial()

// INPUT - GET USER
export const getUserInputSchema = z.object({
	id: z.string().optional(),
})

// OUTPUT - GET USER
export const getUserOutputSchema = userSchema.extend({
	likes: z.number(),
	dislikes: z.number(),
	matches: z.number(),
})

// INPUT - SWIPE AND GET NEXT PROFILE
export const swipeAndGetNextProfileInputSchema = z.object({
	targetId: z.string().or(z.null()).optional().default(null),
	like: z.boolean().or(z.null()).optional().default(null),
})

export const swipeAndGetNextProfileWithIdInputSchema = swipeAndGetNextProfileInputSchema.extend({
	userId: z.string(),
})

// OUTPUT - SWIPE AND GET NEXT PROFILE
export const swipeAndGetNextProfileOutputSchema = z.object({
	match: matchSchema.or(z.null()).optional().default(null),
	nextProfile: userSchema.or(z.null()).optional().default(null),
})

// OUTPUT - LIKES RECEIVED
export const getLikesReceivedOutputSchema = z.object({
	likes: z.array(userSchema),
})

// INPUT - LIKE TOGGLE
export const likeToggleInputSchema = z.object({
	targetId: z.string(),
	action: z.enum(['like', 'dislike']),
})

export const likeToggleWithIdInputSchema = likeToggleInputSchema.extend({
	userId: z.string(),
})

// OUTPUT - LIKE TOGGLE
export const likeToggleOutputSchema = z.object({
	action: z.enum(['liked', 'disliked']),
	isMatch: z.boolean(),
	match: matchSchema.or(z.null()),
})
