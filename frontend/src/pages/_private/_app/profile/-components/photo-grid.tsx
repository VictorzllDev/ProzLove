import { Grid3X3, Heart, MessageCircle } from 'lucide-react'

interface Post {
	id: string
	image: string
	likes: number
	comments: number
}

interface PhotoGridProps {
	posts: Post[]
}

export function PhotoGrid({ posts }: PhotoGridProps) {
	return (
		<div className="mt-6 mb-8 px-4">
			<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
				<div className="flex flex-1 items-center justify-center gap-2 border-border border-b py-4 transition-colors">
					<Grid3X3 className="h-5 w-5" />
					<span className="font-medium">Publicações</span>
				</div>

				<div className="grid grid-cols-3 gap-0.5 p-0.5">
					{posts.map((post) => (
						<div key={post.id} className="group relative aspect-square cursor-pointer overflow-hidden">
							<img
								src={post.image || '/placeholder.svg'}
								alt={`Post ${post.id}`}
								className="object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<div className="absolute inset-0 flex items-center justify-center gap-4 bg-foreground/60 opacity-0 transition-opacity group-hover:opacity-100">
								<div className="flex items-center gap-1.5 text-card">
									<Heart className="h-5 w-5 fill-card" />
									<span className="font-semibold">{post.likes}</span>
								</div>
								<div className="flex items-center gap-1.5 text-card">
									<MessageCircle className="h-5 w-5 fill-card" />
									<span className="font-semibold">{post.comments}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
