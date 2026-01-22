import { useState } from 'react'

interface ProfileStatsProps {
	posts: number
	likes: number
	dislikes: number
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

export function ProfileStats({ posts, likes, dislikes }: ProfileStatsProps) {
	const [isLiked, setIsLiked] = useState(false)

	return (
		<div className="mt-6 px-4">
			<div className="rounded-2xl border border-border bg-card p-4 shadow-lg">
				<div className="flex justify-around py-2">
					<div className="text-center">
						<p className="font-bold text-2xl text-foreground">{formatNumber(posts)}</p>
						<p className="text-muted-foreground text-sm">publicações</p>
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

				<div className="mt-4 flex gap-3">
					<button
						type="button"
						onClick={() => setIsLiked(!isLiked)}
						className={`flex-1 rounded-xl py-3 font-semibold transition-all ${
							isLiked
								? 'border-2 border-primary bg-secondary text-secondary-foreground'
								: 'bg-linear-to-r from-primary to-accent text-primary-foreground'
						}`}
					>
						{isLiked ? 'Liked' : 'Like'}
					</button>
					<button
						type="button"
						className="flex-1 rounded-xl border border-border bg-secondary py-3 font-semibold text-secondary-foreground transition-colors hover:bg-muted hover:text-primary"
					>
						Mensagem
					</button>
				</div>
			</div>
		</div>
	)
}
