import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	DATABASE_URL: z.string(),
	STORAGE_BUCKET: z.string(),
})

export const env = envSchema.parse(process.env)
