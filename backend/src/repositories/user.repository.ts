import { prisma } from '../lib/prisma'
import type { ISaveUser, IStats, IUser, IUserRepository } from '../types/entities/user.entity'

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
