import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import type { IJWTPayload } from '../types/teste.types'
import { validateTokenUtil } from '../utils/validate-token.util'

export async function validateTokenMiddleware(req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
	const token = req.headers.authorization?.split(' ')[1]
	try {
		if (!token) {
			throw new Error('Token not provided')
		}

		const decoded = validateTokenUtil(token)

		req.jwt = (await decoded) as IJWTPayload

		done()
	} catch {
		reply.code(401).send({ error: 'Unauthorized' })
	}
}
