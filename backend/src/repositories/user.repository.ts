import { prisma } from '../lib/prisma'
import type { ISaveUser, IUser, IUserRepository } from '../types/entities/user.entity'

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
}
