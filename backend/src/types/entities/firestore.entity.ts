import type { z } from 'zod'
import type { chatFirestoreSchema, matchFirestoreSchema } from '../schemas/firestore.schema'
import type { IMatch } from './user.entity'

export type IMatchFirestore = z.infer<typeof matchFirestoreSchema>
export type IChatFirestore = z.infer<typeof chatFirestoreSchema>

export interface IFirestoreRepository {
	createMatch(match: IMatch): Promise<void>
}
