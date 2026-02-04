import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
	CLIENT_EMAIL: z.string(),
	PRIVATE_KEY: z.string(),
	PROJECT_ID: z.string(),
	HOST: z.string(),
	PORT: z.string().transform((port) => Number(port)),
	DATABASE_URL: z.string(),
	STORAGE_BUCKET: z.string(),
})

export const env = envSchema.parse(process.env)
