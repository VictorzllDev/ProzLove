import { ZodError, z } from 'zod'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import { PhotoRepository } from '../repositories/photo.repository'
import { generateUploadUrlInputSchema, generateUploadUrlOutputSchema } from '../types/dtos/photo.dto'
import type { FastifyTypeInstace } from '../types/shared/fastify.types'
import { PhotoUseCase } from '../usecases/photo.usecase'
import { HttpError } from '../utils/http-error.util'

const photoUseCase = new PhotoUseCase(new PhotoRepository())

export function photoRoutes(app: FastifyTypeInstace) {
	app.post(
		'/generate-upload-url',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Photo'],
				description: 'Generate upload url',
				body: generateUploadUrlInputSchema,
				response: {
					200: generateUploadUrlOutputSchema,
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
				const uploadUrl = await photoUseCase.generateUploadUrl({
					...req.body,
					userId: req.jwt.uid,
				})
				reply.status(200).send(uploadUrl)
			} catch (error) {
				if (error instanceof ZodError) {
					return reply.status(400).send(error)
				} else if (error instanceof HttpError) {
					return reply.status(error.statusCode as 200 | 400 | 422 | 500).send({ message: error.message })
				} else {
					console.log(error)
					return reply.status(500).send(null)
				}
			}
		},
	)
}
