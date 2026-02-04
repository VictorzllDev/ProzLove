import { Link } from '@tanstack/react-router'
import { EyeIcon, HeartIcon, RefreshCwIcon, XIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import type { IProfile } from '@/types/auth'
import { calculateAge } from '@/utils/calculate-age.util'
import { getInitials } from '@/utils/getInitials.util'

interface IProfileCard {
	profile: IProfile
	onRefresh: () => void
	onLike: () => void
	onDislike: () => void
}

export function ProfileCard({ profile, onRefresh, onLike, onDislike }: IProfileCard) {
	const primaryPhoto = profile.photos?.find((p) => p.isPrimary)

	return (
		<div className="mb-6 rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
			<div className="mb-6 flex items-start gap-4">
				<Link to="/profile/$userId" params={{ userId: profile.id }} className="group relative shrink-0">
					<div className="relative">
						<Avatar className="h-20 w-20">
							<AvatarImage src={primaryPhoto?.url} />
							<AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
						</Avatar>
						<div className="absolute inset-0 rounded-full bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
					</div>
				</Link>

				<div className="min-w-0 flex-1">
					<div className="mb-2 flex items-start justify-between">
						<div className="min-w-0">
							<Link to="/profile/$userId" params={{ userId: profile.id }} className="group">
								<h2 className="truncate font-bold text-gray-900 text-xl transition-colors group-hover:text-blue-600">
									{profile.name}
								</h2>
							</Link>

							<div className="flex items-center gap-3 text-gray-600">
								{profile.birthday && (
									<span className="font-medium text-sm">{calculateAge(String(profile.birthday))} anos</span>
								)}

								{/* {profile.photos && profile.photos.length > 0 && ( */}
								{/* 	<> */}
								{/* 		<span className="text-gray-300">•</span> */}
								{/* 		<div className="flex items-center gap-1 text-sm"> */}
								{/* 			<CameraIcon className="h-3.5 w-3.5" /> */}
								{/* 			<span>{profile.photos.length}</span> */}
								{/* 		</div> */}
								{/* 	</> */}
								{/* )} */}
							</div>
						</div>

						<div className="ml-2 flex items-center gap-2">
							<Button onClick={onRefresh} variant="outline" size="sm" title="Atualizar perfil">
								<RefreshCwIcon />
							</Button>
						</div>
					</div>

					{profile.bio && <p className="line-clamp-2 text-gray-700 text-sm leading-relaxed">{profile.bio}</p>}
				</div>
			</div>

			<div className="flex gap-3 border-gray-100 border-t pt-4">
				<Button
					onClick={onDislike}
					variant="outline"
					className="flex h-12 flex-1 items-center justify-center gap-2 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
				>
					<XIcon className="h-5 w-5" />
					<span className="font-medium">Não Gostei</span>
				</Button>

				<Button
					onClick={onLike}
					className="flex h-12 flex-1 items-center justify-center gap-2 bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-md transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-lg"
				>
					<HeartIcon className="h-5 w-5" />
					<span className="font-medium">Gostei</span>
				</Button>
			</div>

			<div className="mt-4 border-gray-100 border-t pt-4">
				<Link
					to="/profile/$userId"
					params={{ userId: profile.id }}
					className="flex items-center justify-center gap-2 font-medium text-blue-600 text-sm hover:text-blue-800"
				>
					<EyeIcon className="h-4 w-4" />
					Ver perfil completo
				</Link>
			</div>
		</div>
	)
}
