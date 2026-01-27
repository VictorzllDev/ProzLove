import { ZodError, z } from 'zod'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import { SwipeRepository } from '../repositories/swipe.repository'
import { swipeAndGetNextProfileInputSchema, swipeAndGetNextProfileOutputSchema } from '../types/dtos/swipe.dto'
import type { FastifyTypeInstace } from '../types/shared/fastify.types'
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
				body: swipeAndGetNextProfileInputSchema,
				response: {
					200: swipeAndGetNextProfileOutputSchema,
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
				const swipe = await swipeUseCase.SwipeAndGetNextProfile({
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
