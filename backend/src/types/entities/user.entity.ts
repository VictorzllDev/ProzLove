import type { z } from 'zod'
import type {
	createOnboardingInputWithIdSchema,
	getUserOutputSchema,
	likeToggleOutputSchema,
	likeToggleWithIdInputSchema,
	swipeAndGetNextProfileOutputSchema,
	swipeAndGetNextProfileWithIdInputSchema,
	updateOnboardingInputSchema,
} from '../dtos/user.dto'
import type { dislikeSchema } from '../schemas/dislike.schema'
import type { likeSchema } from '../schemas/like.schema'
import type { matchSchema } from '../schemas/match.schema'
import type { photoSchema } from '../schemas/photo.schema'
import type { jwtPayloadSchema, saveUserSchema, statsSchema, userSchema } from '../schemas/user.schema'

// ENTITIES
export type IJWTPayload = z.infer<typeof jwtPayloadSchema>
export type IPhoto = z.infer<typeof photoSchema>
export type IUser = z.infer<typeof userSchema>
export type ILike = z.infer<typeof likeSchema>
export type IDislike = z.infer<typeof dislikeSchema>
export type IMatch = z.infer<typeof matchSchema>

// USE CASE INPUTS
export type ICreateOnboardingWithIdInput = z.infer<typeof createOnboardingInputWithIdSchema>
export type IUpdateOnboardingInput = z.infer<typeof updateOnboardingInputSchema>
export type ISwipeAndGetNextProfileWithIdInput = z.infer<typeof swipeAndGetNextProfileWithIdInputSchema>
export type ILikeToggleWithIdInput = z.infer<typeof likeToggleWithIdInputSchema>

// USE CASE OUTPUTS
export type ISwipeAndGetNextProfileOutput = z.infer<typeof swipeAndGetNextProfileOutputSchema>
export type IGetUserOutput = z.infer<typeof getUserOutputSchema>
export type ILikeToggleOutput = z.infer<typeof likeToggleOutputSchema>

// REPOSITORY INPUTS
export type ISaveUser = z.infer<typeof saveUserSchema>

// REPOSITORY OUTPUTS
export type IStats = z.infer<typeof statsSchema>

// USE CASE INTERFACES
export interface IUserUseCase {
	onboarding(user: ICreateOnboardingWithIdInput): Promise<void>
	getUser(id: string): Promise<IGetUserOutput>
	SwipeAndGetNextProfile(input: ISwipeAndGetNextProfileWithIdInput): Promise<ISwipeAndGetNextProfileOutput>
	getLikesReceived(userId: string): Promise<IUser[]>
	toggleLike(input: ILikeToggleWithIdInput): Promise<ILikeToggleOutput>
}

// REPOSITORY INTERFACES (Contratos do repositório)
export interface IUserRepository {
	save(user: ISaveUser): Promise<void>
	get(id: string): Promise<IUser | null>
	getStats(userId: string): Promise<IStats>
	nextProfile(userId: string, targetId: string | null): Promise<IUser | null>
	like(userId: string, targetId: string): Promise<ILike>
	dislike(userId: string, targetId: string): Promise<IDislike>
	findLike(userId: string, targetId: string): Promise<ILike | null>
	findDislike(userId: string, targetId: string): Promise<IDislike | null>
	deleteLike(userId: string, targetId: string): Promise<void>
	deleteDislike(userId: string, targetId: string): Promise<void>
	getLikesReceived(userId: string): Promise<IUser[]>
	match(userId: string, targetId: string): Promise<IMatch | null>
}
