import { ZodError, z } from 'zod'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import { SwipeRepository } from '../repositories/swipe.repository'
import type { FastifyTypeInstace } from '../types/fastify.types'
import { SwipeUsecase } from '../usecases/swipe.usecase'
import { HttpError } from '../utils/http-error.util'

const swipeUseCase = new SwipeUsecase(new SwipeRepository())

export function swipeRoutes(app: FastifyTypeInstace) {
	app.post(
		'/nextprofile',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Swipe'],
				description: '',
				body: z.object({
					targetId: z.string().or(z.null()),
					like: z.boolean().or(z.null()),
				}),
				response: {
					200: z.object({
						match: z
							.object({
								id: z.string(),
								user1Id: z.string(),
								user2Id: z.string(),
								chatId: z.string(),
								createdAt: z.date(),
							})
							.or(z.null())
							.optional(),
						nextProfile: z
							.object({
								id: z.string(),
								name: z.string(),
								birthday: z.date(),
								gender: z.string(),
								bio: z.string(),
							})
							.or(z.null()),
					}),
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
				const swipe = await swipeUseCase.swipe({
					...req.body,
					userId: req.jwt.uid,
				})
				reply.status(200).send(swipe)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send(error)
				} else if (error instanceof HttpError) {
					reply.status(error.statusCode as 200 | 400 | 422 | 500).send({ message: error.message })
				} else {
					console.log(error)
					reply.status(500).send(null)
				}
			}
		},
	)
}
