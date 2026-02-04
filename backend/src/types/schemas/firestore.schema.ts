import { z } from 'zod'

export const matchFirestoreSchema = z.object({
	id: z.string(),
	user: z.object({
		id: z.string(),
		name: z.string(),
		photoUrl: z.string(),
	}),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export const chatFirestoreSchema = z.object({
	id: z.string(),
	user1: z.object({
		id: z.string(),
		name: z.string(),
		photoUrl: z.string(),
	}),
	user2: z.object({
		id: z.string(),
		name: z.string(),
		photoUrl: z.string(),
	}),
	createdAt: z.date(),
	updatedAt: z.date(),
})
