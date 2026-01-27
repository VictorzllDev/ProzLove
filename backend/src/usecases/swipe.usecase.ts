import type {
	ISwipeAndGetNextProfileOutput,
	ISwipeAndGetNextProfileWithIdInput,
	ISwipeRepository,
	ISwipeUseCase,
} from '../types/entities/swipe.entity'

export class SwipeUsecase implements ISwipeUseCase {
	constructor(private swipeRepository: ISwipeRepository) {}

	async SwipeAndGetNextProfile({
		userId,
		targetId,
		like,
	}: ISwipeAndGetNextProfileWithIdInput): Promise<ISwipeAndGetNextProfileOutput> {
		const nextProfile = await this.swipeRepository.nextProfile(userId, targetId)

		if (userId === targetId || !targetId || like === null) {
			return {
				nextProfile,
				match: null,
			}
		}

		if (like === true) {
			const isDislike = await this.swipeRepository.findDislike(userId, targetId)
			if (isDislike) await this.swipeRepository.deleteDislike(userId, targetId)

			await this.swipeRepository.like(userId, targetId)

			const match = await this.swipeRepository.match(userId, targetId)

			return {
				nextProfile,
				match,
			}
		}

		if (like === false) {
			const isLike = await this.swipeRepository.findLike(userId, targetId)
			if (isLike) await this.swipeRepository.deleteLike(userId, targetId)

			await this.swipeRepository.dislike(userId, targetId)

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
}
