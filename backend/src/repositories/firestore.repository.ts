import { db } from '../firebase/config'
import type { IChatFirestore, IFirestoreRepository, IMatchFirestore } from '../types/entities/firestore.entity'
import type { IMatch } from '../types/entities/user.entity'

export class FirestoreRepository implements IFirestoreRepository {
	async createMatch(match: IMatch): Promise<void> {
		const batch = db.batch()

		// Usuário 1 - Adiciona ao array existente
		const user1Ref = db.collection('users').doc(match.user1Id).collection('matches').doc(match.id)
		batch.set(user1Ref, {
			id: match.id,
			chatId: match.id,
			user: {
				id: match.user2Id,
				name: match.user2?.name,
				photoUrl: match.user2?.photos?.find((photo) => photo.isPrimary)?.url || '',
			},
			createdAt: match.createdAt,
			updatedAt: new Date(),
		} as IMatchFirestore)

		// Usuário 2 - Adiciona ao array existente
		const user2Ref = db.collection('users').doc(match.user2Id).collection('matches').doc(match.id)
		batch.set(user2Ref, {
			id: match.id,
			chatId: match.id,
			user: {
				id: match.user1Id,
				name: match.user1?.name,
				photoUrl: match.user1?.photos?.find((photo) => photo.isPrimary)?.url || '',
			},
			createdAt: match.createdAt,
			updatedAt: new Date(),
		} as IMatchFirestore)
		// 3. Referência do chat
		const chatRef = db.collection('chats').doc(match.id)
		batch.set(chatRef, {
			id: match.id,
			chatId: match.id,
			user1: {
				id: match.user1Id,
				name: match.user1?.name,
				photoUrl: match.user1?.photos?.find((photo) => photo.isPrimary)?.url || '',
			},
			user2: {
				id: match.user2Id,
				name: match.user2?.name,
				photoUrl: match.user2?.photos?.find((photo) => photo.isPrimary)?.url || '',
			},
			createdAt: match.createdAt,
			updatedAt: new Date(),
		} as IChatFirestore)

		// 4. Mensagem inicial no chat
		const messageRef = chatRef.collection('messages').doc() // Firebase gera ID automático
		batch.set(messageRef, {
			senderId: 'system',
			text: `${match.user1?.name} e ${match.user2?.name} se tornaram amigos!`,
			createdAt: match.createdAt,
		})

		// Executa tudo como uma única operação atômica
		await batch.commit()
	}
}
