import type { z } from 'zod'
import type { generateUploadUrlInputWithIdSchema, generateUploadUrlOutputSchema } from '../dtos/photo.dto'
import type { photoSchema, savePhotoSchema } from '../schemas/photo.schema'

// Entities
export type IPhoto = z.infer<typeof photoSchema>
export type ISavePhoto = z.infer<typeof savePhotoSchema>

// Inputs Use Cases
export type IGenerateUploadUrlInput = z.infer<typeof generateUploadUrlInputWithIdSchema>

// Outputs Use Cases
export type IGenerateUploadUrlOutput = z.infer<typeof generateUploadUrlOutputSchema>

// Use Cases
export interface IPhotoUseCase {
	generateUploadUrl(input: IGenerateUploadUrlInput): Promise<IGenerateUploadUrlOutput>
}

// Repositories
export interface IPhotoRepository {
	save(photo: ISavePhoto): Promise<void>
}
