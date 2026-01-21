import { db } from '../firebase/config'
import type { IUser, IUserRepository, IUserUseCase } from '../types/user.types'

export class UserUsecase implements IUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async onboarding(user: IUser): Promise<void> {
		await this.userRepository.save(user)

		await db.collection('users').doc(user.id).set({ completedOnboarding: true })
	}
}
