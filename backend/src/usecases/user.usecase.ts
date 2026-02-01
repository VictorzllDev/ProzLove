import { db } from '../firebase/config'
import type {
	ICreateOnboardingWithIdInput,
	IGetUserOutput,
	ILikeToggleOutput,
	ILikeToggleWithIdInput,
	ISwipeAndGetNextProfileOutput,
	ISwipeAndGetNextProfileWithIdInput,
	IUser,
	IUserRepository,
	IUserUseCase,
} from '../types/entities/user.entity'
import { HttpError } from '../utils/http-error.util'

export class UserUsecase implements IUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async onboarding(user: ICreateOnboardingWithIdInput): Promise<void> {
		await this.userRepository.save(user)

		await db.collection('users').doc(user.id).set({ completedOnboarding: true })
	}

	async getUser(id: string): Promise<IGetUserOutput> {
		const user = await this.userRepository.get(id)
		if (!user) throw new HttpError('User not found', 404)

		const userStats = await this.userRepository.getStats(id)

		return { ...user, ...userStats }
	}

	async SwipeAndGetNextProfile({
		userId,
		targetId,
		like,
	}: ISwipeAndGetNextProfileWithIdInput): Promise<ISwipeAndGetNextProfileOutput> {
		const nextProfile = await this.userRepository.nextProfile(userId, targetId)

		if (userId === targetId || !targetId || like === null) {
			return {
				nextProfile,
				match: null,
			}
		}

		if (like === true) {
			const isDislike = await this.userRepository.findDislike(userId, targetId)
			if (isDislike) await this.userRepository.deleteDislike(userId, targetId)

			await this.userRepository.like(userId, targetId)

			const match = await this.userRepository.match(userId, targetId)

			return {
				nextProfile,
				match,
			}
		}

		if (like === false) {
			const isLike = await this.userRepository.findLike(userId, targetId)
			if (isLike) await this.userRepository.deleteLike(userId, targetId)

			await this.userRepository.dislike(userId, targetId)

			return {
				nextProfile,
				match: null,
			}
		}

		return {
			nextProfile,
			match: null,
		}
	}

	async getLikesReceived(userId: string): Promise<IUser[]> {
		return await this.userRepository.getLikesReceived(userId)
	}

	async toggleLike({ userId, targetId, action }: ILikeToggleWithIdInput): Promise<ILikeToggleOutput> {
		if (userId === targetId) {
			throw new HttpError('You cannot like yourself', 400)
		}

		if (action === 'like') {
			const isDislike = await this.userRepository.findDislike(userId, targetId)
			if (isDislike) await this.userRepository.deleteDislike(userId, targetId)

			await this.userRepository.like(userId, targetId)

			const match = await this.userRepository.match(userId, targetId)

			return {
				action: 'liked',
				isMatch: !!match,
				match,
			}
		}

		if (action === 'dislike') {
			const isLike = await this.userRepository.findLike(userId, targetId)
			if (isLike) await this.userRepository.deleteLike(userId, targetId)

			await this.userRepository.dislike(userId, targetId)

			return {
				action: 'disliked',
				isMatch: false,
				match: null,
			}
		}

		return {
			action: 'liked',
			isMatch: false,
			match: null,
		}
	}
}
