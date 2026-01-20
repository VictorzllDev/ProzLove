import type { IUser, IUserRepository, IUserUseCase } from '../types/user.types'

export class UserUsecase implements IUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async onboarding(user: IUser): Promise<void> {
		await this.userRepository.save(user)
	}
}
