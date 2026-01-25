import { Skeleton } from '@/components/ui/skeleton'

export function ProfileCardSkeleton() {
	return (
		<div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
			<div className="mb-4 flex items-start justify-between">
				<div className="space-y-2">
					<Skeleton className="h-7 w-48" />
					<Skeleton className="h-5 w-20" />
				</div>
				<Skeleton className="h-8 w-10 rounded-md" />
			</div>

			<div className="mb-4 space-y-1">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-4/5" />
			</div>

			<div className="mt-6 flex gap-4">
				<Skeleton className="h-10 flex-1" />
				<Skeleton className="h-10 flex-1" />
			</div>
		</div>
	)
}
