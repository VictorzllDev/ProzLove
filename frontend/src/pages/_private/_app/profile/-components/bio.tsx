interface ProfileBioProps {
	bio: string
}

export function ProfileBio({ bio }: ProfileBioProps) {
	return (
		<div className="mt-6 px-4">
			<div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
				<h2 className="mb-3 font-bold text-foreground text-lg">Sobre mim</h2>
				<p className="text-muted-foreground leading-relaxed">{bio}</p>
			</div>
		</div>
	)
}
