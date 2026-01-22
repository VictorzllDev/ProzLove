import { db } from '../firebase/config'
import type { IUser, IUserRepository, IUserResponseDTO, IUserUseCase } from '../types/user.types'
import { HttpError } from '../utils/http-error.util'

export class UserUsecase implements IUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async onboarding(user: IUser): Promise<void> {
		await this.userRepository.save(user)

		await db.collection('users').doc(user.id).set({ completedOnboarding: true })
	}

	async getUser(id: string): Promise<IUserResponseDTO> {
		const user = await this.userRepository.get(id)
		if (!user) throw new HttpError('User not found', 404)

		return user as IUserResponseDTO
	}
}
