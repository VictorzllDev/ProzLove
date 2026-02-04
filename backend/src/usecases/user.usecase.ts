import { db } from '../firebase/config'
import type { IFirestoreRepository } from '../types/entities/firestore.entity'
import type {
	ICreateOnboardingWithIdInput,
	IGetUserOutput,
	ILikeToggleOutput,
	ILikeToggleWithIdInput,
	ISwipeAndGetNextProfileOutput,
	ISwipeAndGetNextProfileWithIdInput,
	IUpdateUserWithIdInput,
	IUser,
	IUserRepository,
	IUserUseCase,
} from '../types/entities/user.entity'
import { HttpError } from '../utils/http-error.util'

export class UserUsecase implements IUserUseCase {
	constructor(
		private userRepository: IUserRepository,
		private firestoreRepository: IFirestoreRepository,
	) {}

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

	async updateUser(input: IUpdateUserWithIdInput): Promise<void> {
		const user = await this.userRepository.get(input.id)
		if (!user) throw new HttpError('User not found', 404)

		await this.userRepository.update(input)
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

			const hasReciprocalLike = await this.userRepository.hasReciprocalLike(userId, targetId)
			if (!hasReciprocalLike)
				return {
					nextProfile,
					match: null,
				}

			const existingMatch = await this.userRepository.findExistingMatch(userId, targetId)
			if (existingMatch)
				return {
					nextProfile,
					match: null,
				}

			const match = await this.userRepository.createMatch(userId, targetId)
			await this.firestoreRepository.createMatch(match)

			return {
				nextProfile,
				match,
			}
		}

		if (like === false) {
			const isMatch = await this.userRepository.findExistingMatch(userId, targetId)
			if (isMatch)
				return {
					nextProfile,
					match: null,
				}

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

			const hasReciprocalLike = await this.userRepository.hasReciprocalLike(userId, targetId)
			if (!hasReciprocalLike)
				return {
					action: 'liked',
					isMatch: false,
					match: null,
				}

			const isMatch = await this.userRepository.findExistingMatch(userId, targetId)
			if (isMatch)
				return {
					action: 'liked',
					isMatch: !!isMatch,
					match: isMatch,
				}

			const match = await this.userRepository.createMatch(userId, targetId)
			await this.firestoreRepository.createMatch(match)

			return {
				action: 'liked',
				isMatch: !!match,
				match,
			}
		}

		if (action === 'dislike') {
			const isMatch = await this.userRepository.findExistingMatch(userId, targetId)
			if (isMatch) throw new HttpError('Match already exists between users', 409)

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
