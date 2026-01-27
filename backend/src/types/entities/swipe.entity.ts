import type { z } from 'zod'
import type { swipeAndGetNextProfileOutputSchema, swipeAndGetNextProfileWithIdInputSchema } from '../dtos/swipe.dto'
import type { dislikeSchema, likeSchema, matchSchema } from '../schemas/swipe.schema'
import type { IUser } from './user.entity'

// Entities
export type ILike = z.infer<typeof likeSchema>
export type IDislike = z.infer<typeof dislikeSchema>
export type IMatch = z.infer<typeof matchSchema>

// Inputs Use Cases
export type ISwipeAndGetNextProfileWithIdInput = z.infer<typeof swipeAndGetNextProfileWithIdInputSchema>

// Outputs Use Cases
export type ISwipeAndGetNextProfileOutput = z.infer<typeof swipeAndGetNextProfileOutputSchema>

// Use Cases
export interface ISwipeUseCase {
	SwipeAndGetNextProfile(input: ISwipeAndGetNextProfileWithIdInput): Promise<ISwipeAndGetNextProfileOutput>
}

// Repositories
export interface ISwipeRepository {
	nextProfile(userId: string, targetId: string | null): Promise<IUser | null>
	like(userId: string, targetId: string): Promise<ILike>
	dislike(userId: string, targetId: string): Promise<IDislike>
	match(userId: string, targetId: string): Promise<IMatch | null>
	findLike(userId: string, targetId: string): Promise<ILike | null>
	findDislike(userId: string, targetId: string): Promise<IDislike | null>
	deleteLike(userId: string, targetId: string): Promise<void>
	deleteDislike(userId: string, targetId: string): Promise<void>
}
