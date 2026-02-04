export interface IMatchFirestore {
	id: string
	user: {
		id: string
		name: string
		photoUrl: string
	}
	createdAt: Date
	updatedAt: Date
}

export interface IChatFirestore {
	id: string
	user1: {
		id: string
		name: string
		photoUrl: string
	}
	user2: {
		id: string
		name: string
		photoUrl: string
	}
	createdAt: Date
	updatedAt: Date
}

export interface IMessage {
	id: string
	senderId: string
	text: string
	createdAt: Date
}
