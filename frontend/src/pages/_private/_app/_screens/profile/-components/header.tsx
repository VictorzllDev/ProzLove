import { Link } from '@tanstack/react-router'
import { Heart, MapPin, Mars, PencilRuler, Sparkles, Venus, Verified } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utils/getInitials.util'

interface ProfileHeaderProps {
	name: string
	age: number
	gender: 'MALE' | 'FEMALE'
	location: string
	verified: boolean
	profileImage: string
	isMyProfile: boolean
}

export function ProfileHeader({
	name,
	age,
	gender,
	location,
	verified,
	profileImage,
	isMyProfile,
}: ProfileHeaderProps) {
	return (
		<div className="relative">
			<div className="absolute inset-0 h-48 rounded-b-[3rem] bg-accent/80" />

			<div className="relative px-4 pt-20">
				<div className="relative mx-auto w-fit">
					<div className="absolute inset-0 scale-95 rounded-3xl bg-linear-to-br from-primary to-accent opacity-50 blur-xl" />
					<div className="relative overflow-hidden rounded-3xl bg-card shadow-2xl">
						<div className="relative h-72 w-72 md:h-80 md:w-80">
							<Avatar className="h-full w-full rounded-none">
								<AvatarImage src={profileImage} />
								<AvatarFallback className="h-full w-full rounded-none text-5xl">{getInitials(name)}</AvatarFallback>
							</Avatar>

							<div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-foreground/90 via-foreground/50 to-transparent p-6">
								<div className="flex min-w-0 flex-nowrap items-center gap-2">
									<h1 className="truncate font-bold text-2xl text-card">{name}</h1>
									<span className="whitespace-nowrap text-card/80 text-xl">{age}</span>
									{verified && (
										<div className="shrink-0 rounded-full bg-primary p-1">
											<Verified className="h-4 w-4 text-primary-foreground" />
										</div>
									)}
								</div>
								<div className="mt-1 flex items-center gap-1.5 text-card/80">
									<MapPin className="h-4 w-4" />
									<span className="text-sm">{location}</span>
								</div>
								<div className="mt-1 flex items-center gap-1.5 text-card/80">
									{gender === 'MALE' && <Mars className="h-4 w-4" />}
									{gender === 'FEMALE' && <Venus className="h-4 w-4" />}
									<span className="text-sm">
										{gender === 'MALE' && 'Homem'}
										{gender === 'FEMALE' && 'Mulher'}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="group absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-primary to-accent p-4 shadow-lg transition-transform">
						<Heart className="h-7 w-7 animate-pulse fill-primary-foreground text-primary-foreground" />
					</div>
					{isMyProfile && (
						<Link
							to="/profile/update"
							className="group absolute top-2 right-2 rounded-full bg-accent p-1.5 text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
						>
							<PencilRuler className="size-5" />
						</Link>
					)}
				</div>
			</div>

			<div className="mt-10 flex justify-center">
				<div className="flex items-center gap-2 rounded-full border border-primary/20 bg-linear-to-r from-primary/10 to-accent/10 px-4 py-2">
					<Sparkles className="h-4 w-4 text-primary" />
					<span className="font-medium text-foreground text-sm">98% de compatibilidade</span>
				</div>
			</div>
		</div>
	)
}
