import type { z } from 'zod'
import type {
	createOnboardingInputWithIdSchema,
	getUserOutputSchema,
	updateOnboardingInputSchema,
} from '../dtos/user.dto'
import type { photoSchema } from '../schemas/photo.schema'
import type { jwtPayloadSchema, saveUserSchema, statsSchema, userSchema } from '../schemas/user.schema'

// Entities
export type IJWTPayload = z.infer<typeof jwtPayloadSchema>
export type IPhoto = z.infer<typeof photoSchema>
export type IUser = z.infer<typeof userSchema>

// Inputs Use Cases
export type ICreateOnboardingWithIdInput = z.infer<typeof createOnboardingInputWithIdSchema>
export type IUpdateOnboardingInput = z.infer<typeof updateOnboardingInputSchema>

// Outputs Use Cases
export type IGetUserOutput = z.infer<typeof getUserOutputSchema>

// Inputs repository
export type ISaveUser = z.infer<typeof saveUserSchema>

// Outputs repository
export type IStats = z.infer<typeof statsSchema>

// Use Cases
export interface IUserUseCase {
	onboarding(user: ICreateOnboardingWithIdInput): Promise<void>
	getUser(id: string): Promise<IGetUserOutput>
}

// Repositories
export interface IUserRepository {
	save(user: ISaveUser): Promise<void>
	get(id: string): Promise<IUser | null>
	getStats(userId: string): Promise<IStats>
}
