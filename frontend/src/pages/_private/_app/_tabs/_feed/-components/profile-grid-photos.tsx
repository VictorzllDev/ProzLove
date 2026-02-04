import { Link } from '@tanstack/react-router'
import type { IProfile } from '@/types/auth'

interface IProfileGridPhotos {
	profile: IProfile
}
export default function ProfileGridPhotos({ profile }: IProfileGridPhotos) {
	return (
		<div>
			{profile.photos && profile.photos.length > 1 && (
				<div className="mb-6">
					<div className="mb-3 flex items-center justify-between">
						<h3 className="font-medium text-gray-700 text-sm">Fotos do perfil</h3>
						<Link
							to="/profile/$userId"
							params={{ userId: profile.id }}
							className="text-blue-600 text-xs transition-colors hover:text-blue-800 hover:underline"
						>
							Ver todas
						</Link>
					</div>
					<div className="flex gap-2 overflow-x-auto pb-3">
						{profile.photos.slice(0, 4).map((photo) => (
							<Link
								key={photo.id}
								to="/profile/$userId"
								params={{ userId: profile.id }}
								className="group relative shrink-0"
							>
								<div
									className={`relative h-16 w-16 overflow-hidden rounded-lg ${
										photo.isPrimary ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
									}`}
								>
									<img
										src={photo.url}
										alt=""
										className="h-full w-full object-cover transition-transform group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
									{photo.isPrimary && (
										<div className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs">
											★
										</div>
									)}
								</div>
							</Link>
						))}

						{profile.photos.length > 4 && (
							<Link
								to="/profile/$userId"
								params={{ userId: profile.id }}
								className="group flex h-16 w-16 items-center justify-center rounded-lg border border-gray-300 bg-linear-to-br from-gray-100 to-gray-200 transition-all hover:from-gray-200 hover:to-gray-300"
							>
								<div className="text-center">
									<span className="block font-bold text-gray-700 text-lg group-hover:text-gray-900">
										+{profile.photos.length - 4}
									</span>
									<span className="text-gray-500 text-xs">mais</span>
								</div>
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
