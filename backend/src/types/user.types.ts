export interface IJWTPayload {
	uid: string
	email: string
	iat: number
	exp: number
}

export interface IUser {
	id: string
	name: string
	birthday: Date
	gender: 'MALE' | 'FEMALE'
	bio: string
}

// DTO
export interface IUserResponseDTO extends IUser {
	createdAt: Date
	updatedAt: Date
}

export interface IUserUseCase {
	onboarding(user: IUser): Promise<void>
	getUser(id: string): Promise<IUserResponseDTO>
}

export interface IUserRepository {
	save(user: IUser): Promise<void>
	get(id: string): Promise<IUser | null>
}
