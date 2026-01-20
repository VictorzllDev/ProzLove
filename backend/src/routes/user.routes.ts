import z, { ZodError } from 'zod'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import { UserRepository } from '../repositories/user.repository'
import type { FastifyTypeInstace } from '../types/fastify.types'
import { UserUsecase } from '../usecases/user.usecase'
import { HttpError } from '../utils/http-error.util'

const userUseCase = new UserUsecase(new UserRepository())

export function userRoutes(app: FastifyTypeInstace) {
	app.post(
		'/onboarding',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['User'],
				description: 'User onboarding',
				body: z.object({
					name: z.string(),
					birthday: z.coerce.date(),
					gender: z.enum(['MALE', 'FEMALE']),
					bio: z.string(),
				}),
				response: {
					204: z.null(),
					400: z
						.object({
							statusCode: z.number(),
							code: z.string(),
							error: z.string(),
							message: z.string(),
						})
						.or(z.unknown()),
					422: z.object({
						message: z.string(),
					}),
					500: z.null(),
				},
			},
		},
		async (req, reply) => {
			try {
				await userUseCase.onboarding({
					...req.body,
					id: req.jwt.uid,
				})

				reply.status(204).send(null)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send(error)
				} else if (error instanceof HttpError) {
					reply.status(error.statusCode as 204 | 400 | 422 | 500).send({ message: error.message })
				} else {
					console.log(error)
					reply.status(500).send(null)
				}
			}
		},
	)
}
