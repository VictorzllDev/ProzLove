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

export interface IUserUseCase {
	onboarding(user: IUser): Promise<void>
}

export interface IUserRepository {
	save(user: IUser): Promise<void>
}
