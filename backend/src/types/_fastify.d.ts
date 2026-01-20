import 'fastify'
import type { IJWTPayload } from './user.types'

declare module 'fastify' {
	interface FastifyRequest {
		jwt: IJWTPayload
	}
}
