import { prisma } from '../lib/prisma'
import type { IUser, IUserRepository } from '../types/user.types'

export class UserRepository implements IUserRepository {
	async save({ id, name, birthday, gender, bio }: IUser): Promise<void> {
		await prisma.user.create({
			data: {
				id,
				name,
				birthday,
				gender,
				bio,
			},
		})
	}
}
