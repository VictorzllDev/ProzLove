import { RefreshCwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { IProfile } from '@/types/auth'
import { calculateAge } from '@/utils/calculate-age.util'
import { ProfileCardSkeleton } from './profile-card.skeleton'

interface IProfileCard {
	profile: IProfile
	isPending: boolean
	onRefresh: () => void
	onLike: () => void
	onDislike: () => void
}

export function ProfileCard({ profile, isPending = false, onRefresh, onLike, onDislike }: IProfileCard) {
	if (isPending) <ProfileCardSkeleton />

	return (
		<div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
			<div className="mb-4 flex items-start justify-between">
				<div>
					<h2 className="font-semibold text-xl">{profile.name}</h2>
					{profile.birthday && <p className="text-gray-600">{calculateAge(String(profile.birthday))} anos</p>}
				</div>
				<Button onClick={onRefresh} variant="outline" size="sm" title="Atualizar perfil">
					<RefreshCwIcon className="h-4 w-4" />
				</Button>
			</div>

			{profile.bio && <p className="mb-4 text-gray-700">{profile.bio}</p>}

			<div className="mt-6 flex gap-4">
				<Button onClick={onDislike} variant="outline" className="flex-1" disabled={isPending}>
					Não gostei
				</Button>
				<Button onClick={onLike} className="flex-1 bg-pink-500 hover:bg-pink-600" disabled={isPending}>
					Gostei
				</Button>
			</div>
		</div>
	)
}
