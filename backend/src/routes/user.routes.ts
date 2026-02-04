import { ZodError, z } from 'zod'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import { FirestoreRepository } from '../repositories/firestore.repository'
import { UserRepository } from '../repositories/user.repository'
import {
	createOnboardingInputSchema,
	getLikesReceivedOutputSchema,
	getUserInputSchema,
	getUserOutputSchema,
	likeToggleInputSchema,
	likeToggleOutputSchema,
	swipeAndGetNextProfileInputSchema,
	swipeAndGetNextProfileOutputSchema,
} from '../types/dtos/user.dto'
import type { FastifyTypeInstace } from '../types/shared/fastify.types'
import { UserUsecase } from '../usecases/user.usecase'
import { HttpError } from '../utils/http-error.util'

const userUseCase = new UserUsecase(new UserRepository(), new FirestoreRepository())

export function userRoutes(app: FastifyTypeInstace) {
	app.post(
		'/onboarding',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Onboarding'],
				description: 'User onboarding',
				body: createOnboardingInputSchema,
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
		'/profile/:id',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Profile'],
				description: 'Get user profile',
				params: getUserInputSchema,
				response: {
					200: getUserOutputSchema,
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
				const id = req.params.id
				const user = await userUseCase.getUser(id || req.jwt.uid)
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

	app.post(
		'/swipe/nextprofile',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Discovery'],
				description: 'Get profiles for swiping',
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
				const swipe = await userUseCase.SwipeAndGetNextProfile({
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

	app.get(
		'/likes/received',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Interactions'],
				description: 'Get Likes Received',
				response: {
					200: getLikesReceivedOutputSchema,
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
				const likes = await userUseCase.getLikesReceived(req.jwt.uid)
				reply.status(200).send({ likes })
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

	app.post(
		'/likes/toggle',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Interactions'],
				description: 'Toggle Like',
				body: likeToggleInputSchema,
				response: {
					200: likeToggleOutputSchema,
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
				const like = await userUseCase.toggleLike({
					...req.body,
					userId: req.jwt.uid,
				})

				reply.status(200).send(like)
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
