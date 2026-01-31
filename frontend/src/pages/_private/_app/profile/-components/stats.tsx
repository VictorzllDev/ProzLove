interface ProfileStatsProps {
	likes: number
	dislikes: number
	matches: number
}

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return `${(num / 1000000).toFixed(1)}M`
	}
	if (num >= 1000) {
		return `${(num / 1000).toFixed(1)}K`
	}
	return num.toString()
}

export function ProfileStats({ likes, dislikes, matches }: ProfileStatsProps) {
	return (
		<div className="mt-6 px-4">
			<div className="rounded-2xl border border-border bg-card p-4 shadow-lg">
				<div className="flex justify-around py-2">
					<div className="text-center">
						<p className="font-bold text-2xl text-foreground">{formatNumber(matches)}</p>
						<p className="text-muted-foreground text-sm">Matches</p>
					</div>
					<div className="w-px bg-border" />
					<div className="text-center">
						<p className="font-bold text-2xl text-primary">{formatNumber(likes)}</p>
						<p className="text-muted-foreground text-sm">likes</p>
					</div>
					<div className="w-px bg-border" />
					<div className="text-center">
						<p className="font-bold text-2xl text-muted-foreground">{formatNumber(dislikes)}</p>
						<p className="text-muted-foreground text-sm">dislikes</p>
					</div>
				</div>
			</div>
		</div>
	)
}
