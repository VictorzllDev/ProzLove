import type { FastifyReply, FastifyRequest } from 'fastify'
import type { IJWTPayload } from '../types/entities/user.entity'
import { validateTokenUtil } from '../utils/validate-token.util'

export async function validateTokenMiddleware(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.authorization?.split(' ')[1]

	try {
		if (!token) {
			throw new Error('Token not provided')
		}

		const decoded = await validateTokenUtil(token)
		req.jwt = decoded as IJWTPayload
	} catch (error) {
		reply.code(401).send({ error: 'Unauthorized' })
		throw error
	}
}
