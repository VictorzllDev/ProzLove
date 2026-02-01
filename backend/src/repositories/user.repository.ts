import { prisma } from '../lib/prisma'
import type { IDislike, ILike, IMatch, ISaveUser, IStats, IUser, IUserRepository } from '../types/entities/user.entity'

export class UserRepository implements IUserRepository {
	async save({ id, name, birthday, gender, bio }: ISaveUser): Promise<void> {
		await prisma.user.upsert({
			where: { id },
			update: { name, birthday, gender, bio },
			create: { id, name, birthday, gender, bio },
		})
	}

	async get(id: string): Promise<IUser | null> {
		return await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				photos: true,
			},
		})
	}

	async getStats(userId: string): Promise<IStats> {
		const likes = await prisma.like.count({
			where: {
				targetId: userId,
			},
		})

		const dislikes = await prisma.dislike.count({
			where: {
				targetId: userId,
			},
		})

		const matches = await prisma.match.count({
			where: {
				OR: [
					{
						user1Id: userId,
					},
					{
						user2Id: userId,
					},
				],
			},
		})

		return {
			likes,
			dislikes,
			matches,
		}
	}

	async nextProfile(userId: string, targetId: string | null): Promise<IUser | null> {
		// Buscar o usuário atual e seus likes/dislikes em uma única query
		const [currentUser, likedUsers, recentDislikes] = await Promise.all([
			prisma.user.findUnique({
				where: { id: userId },
				select: { gender: true },
			}),
			prisma.like.findMany({
				where: { userId },
				select: { targetId: true },
			}),
			prisma.dislike.findMany({
				where: {
					userId,
					createdAt: { gte: new Date(Date.now() - 60 * 1000) },
				},
				select: { targetId: true },
			}),
		])

		if (!currentUser) {
			throw new Error('Usuário não encontrado')
		}

		// Determinar sexo oposto
		const oppositeGender =
			currentUser.gender === 'MALE' ? 'FEMALE' : currentUser.gender === 'FEMALE' ? 'MALE' : currentUser.gender

		// Combinar IDs excluídos
		const excludedUserIds = [
			userId,
			targetId || '',
			...likedUsers.map((like) => like.targetId),
			...recentDislikes.map((dislike) => dislike.targetId),
		].filter((id, index, self) => id && id.trim() !== '' && self.indexOf(id) === index)

		// Buscar usuário aleatório do sexo oposto
		const availableUsers = await prisma.user.findMany({
			where: {
				id: { notIn: excludedUserIds },
				gender: oppositeGender,
			},
			include: { photos: true },
			take: 1,
			skip: Math.floor(
				Math.random() *
					(await prisma.user.count({
						where: {
							id: { notIn: excludedUserIds },
							gender: oppositeGender,
						},
					})),
			),
		})

		return availableUsers[0] || null
	}

	async like(userId: string, targetId: string): Promise<ILike> {
		return await prisma.like.upsert({
			where: {
				userId_targetId: {
					userId,
					targetId,
				},
			},
			update: {
				createdAt: new Date(),
			},
			create: {
				userId,
				targetId,
			},
		})
	}

	async dislike(userId: string, targetId: string): Promise<IDislike> {
		return await prisma.dislike.upsert({
			where: {
				userId_targetId: {
					userId,
					targetId,
				},
			},
			update: {
				createdAt: new Date(),
			},
			create: {
				userId,
				targetId,
			},
		})
	}

	async match(userId: string, targetId: string): Promise<IMatch | null> {
		const [user1, user2] = [userId, targetId]
		const isReciprocoMatch = await prisma.like.findUnique({
			where: {
				userId_targetId: {
					userId: user2,
					targetId: user1,
				},
			},
		})
		if (!isReciprocoMatch) return null

		const existingMatch = await prisma.match.findUnique({
			where: {
				user1Id_user2Id: {
					user1Id: user1,
					user2Id: user2,
				},
			},
		})

		if (existingMatch) {
			return existingMatch // Já existe, retorna o existente
		}

		const chatId = `${user1}_${user2}`

		const match = await prisma.match.create({
			data: {
				user1Id: user1,
				user2Id: user2,
				chatId: chatId,
			},
		})

		return match
	}

	async findLike(userId: string, targetId: string): Promise<ILike | null> {
		return await prisma.like.findUnique({
			where: {
				userId_targetId: {
					userId,
					targetId,
				},
			},
		})
	}

	async findDislike(userId: string, targetId: string): Promise<IDislike | null> {
		return await prisma.dislike.findUnique({
			where: {
				userId_targetId: {
					userId,
					targetId,
				},
			},
		})
	}

	async deleteLike(userId: string, targetId: string): Promise<void> {
		await prisma.like.deleteMany({
			where: {
				userId,
				targetId,
			},
		})
	}

	async deleteDislike(userId: string, targetId: string): Promise<void> {
		await prisma.dislike.deleteMany({
			where: {
				userId,
				targetId,
			},
		})
	}

	async getLikesReceived(userId: string): Promise<IUser[]> {
		return await prisma.user.findMany({
			where: {
				givenLikes: {
					some: {
						targetId: userId,
					},
				},
				AND: [
					{
						receivedLikes: {
							none: {
								userId: userId,
							},
						},
					},
					{
						receivedDislikes: {
							none: {
								userId: userId,
							},
						},
					},
					{
						OR: [
							{
								matchesAsUser1: {
									none: {
										user2Id: userId,
									},
								},
							},
							{
								matchesAsUser2: {
									none: {
										user1Id: userId,
									},
								},
							},
						],
					},
				],
			},
			include: {
				photos: {
					where: {
						isPrimary: true,
					},
					take: 1,
				},
			},
		})
	}
}
