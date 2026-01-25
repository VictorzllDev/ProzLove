import { Skeleton } from '@/components/ui/skeleton'

export function HeaderSkeleton() {
	return (
		<header className="mb-6 flex items-center justify-between">
			<div>
				<Skeleton className="mb-2 h-8 w-24" />
				<Skeleton className="h-4 w-32" />
			</div>
		</header>
	)
}
