import type { ISwipeRepository, ISwipeResponse, ISwipeResquestDTO, ISwipeUseCase } from '../types/swipe.types'

export class SwipeUsecase implements ISwipeUseCase {
	constructor(private swipeRepository: ISwipeRepository) {}

	async swipe({ userId, targetId, like }: ISwipeResquestDTO): Promise<ISwipeResponse> {
		const nextProfile = await this.swipeRepository.nextProfile(userId, targetId)

		if (userId === targetId || !targetId) {
			return {
				nextProfile,
			}
		}

		const isLike = await this.swipeRepository.findLike(userId, targetId)
		const isDislike = await this.swipeRepository.findDislike(userId, targetId)

		if (like === true) {
			if (isDislike) await this.swipeRepository.deleteDislike(userId, targetId)
			await this.swipeRepository.like(userId, targetId)

			const match = await this.swipeRepository.match(userId, targetId)

			return {
				nextProfile,
				match,
			}
		}

		if (like === false) {
			if (isLike) await this.swipeRepository.deleteLike(userId, targetId)

			await this.swipeRepository.dislike(userId, targetId)

			return {
				nextProfile,
			}
		}

		return {
			nextProfile,
		}
	}
}
