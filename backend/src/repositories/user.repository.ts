import { prisma } from '../lib/prisma'
import type { IUser, IUserRepository } from '../types/user.types'

export class UserRepository implements IUserRepository {
	async save({ id, name, birthday, gender, bio }: IUser): Promise<void> {
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
		})
	}
}
