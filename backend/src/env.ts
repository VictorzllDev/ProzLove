import { z } from 'zod'

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
