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
					name: z.string().trim().min(2, 'Name must have at least 2 characters').max(100, 'Very long name'),
					birthday: z.coerce.date().refine((date) => {
						const today = new Date()
						const minDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
						return date <= minDate
					}, 'You must be at least 17 years old'),
					gender: z.enum(['MALE', 'FEMALE']),
					bio: z.string().trim().min(1, 'Bio must have at least 1 characters').max(255, 'Very long bio'),
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

	app.get(
		'/profile',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['User'],
				description: 'Get user profile',
				response: {
					200: z.object({
						id: z.string(),
						name: z.string(),
						birthday: z.coerce.date(),
						gender: z.string(),
						bio: z.string(),
						createdAt: z.coerce.date(),
						updatedAt: z.coerce.date(),
					}),
					400: z
						.object({
							statusCode: z.number(),
							code: z.string(),
							error: z.string(),
							message: z.string(),
						})
						.or(z.unknown()),
					404: z
						.object({
							message: z.string(),
						})
						.or(z.unknown()),
					500: z.null(),
				},
			},
		},
		async (req, reply) => {
			try {
				const user = await userUseCase.getUser(req.jwt.uid)
				reply.status(200).send(user)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send(error)
				} else if (error instanceof HttpError) {
					reply.status(error.statusCode as 200 | 400 | 404 | 500).send({ message: error.message })
				} else {
					console.log(error)
					reply.status(500).send(null)
				}
			}
		},
	)
}
