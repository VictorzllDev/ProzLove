import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LogoSplashProps {
	duration?: number
	onComplete?: () => void
	showProgress?: boolean
	logoSrc?: string
	companyName?: string
}

export function LogoSplash({
	duration = 3000,
	onComplete,
	showProgress = false,
	logoSrc = '/logo.svg',
	companyName = 'Proz Love <3',
}: LogoSplashProps) {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (!showProgress) {
			const timer = setTimeout(() => {
				onComplete?.()
			}, duration)
			return () => clearTimeout(timer)
		}

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					setTimeout(() => onComplete?.(), 200)
					return 100
				}
				return prev + Math.random() * 30
			})
		}, 300)

		return () => clearInterval(interval)
	}, [duration, onComplete, showProgress])

	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
			{/* Animated gradient background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-pink-500/10 blur-3xl" />
				<div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-rose-500/10 blur-3xl delay-1000" />
			</div>

			{/* Content */}
			<div className="relative z-10 flex flex-col items-center justify-center gap-8">
				{/* Logo with scale and fade animation */}
				<div className="fade-in zoom-in animate-in duration-700 ease-out">
					<div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24 md:h-32 md:w-32">
						<img
							src={logoSrc || '/placeholder.svg'}
							alt={companyName}
							className="h-full w-full object-contain drop-shadow-2xl"
						/>
					</div>
				</div>

				{/* Company name */}
				<div className="fade-in slide-in-from-bottom-4 animate-in delay-300 duration-700 ease-out">
					<h1 className="text-center font-bold text-2xl text-white tracking-tight sm:text-3xl md:text-4xl">
						{companyName}
					</h1>
				</div>

				{/* Loading indicator or progress bar */}
				<div className="fade-in animate-in delay-500 duration-700 ease-out">
					{showProgress ? (
						<div className="w-48 sm:w-56 md:w-64">
							<div className="relative h-1 overflow-hidden rounded-full bg-slate-700">
								<div
									className="h-full rounded-full bg-linear-to-r from-pink-500 to-rose-500 transition-all duration-300"
									style={{ width: `${Math.min(progress, 100)}%` }}
								/>
							</div>
							<p className="mt-3 text-center text-slate-400 text-xs">{Math.round(Math.min(progress, 100))}%</p>
						</div>
					) : (
						<div className="flex h-8 items-center justify-center gap-2">
							<div className="h-2 w-2 animate-bounce rounded-full bg-pink-500" />
							<div className="h-2 w-2 animate-bounce rounded-full bg-pink-500 delay-100" />
							<div className="h-2 w-2 animate-bounce rounded-full bg-pink-500 delay-200" />
						</div>
					)}
				</div>

				{/* Loading text */}
				<div className="fade-in animate-in delay-700 duration-700 ease-out">
					<p className="text-slate-400 text-sm sm:text-base">Inicializando aplicação...</p>
				</div>
			</div>

			<style>{`
        @keyframes delay-100 {
          0% {
            animation-delay: 0.1s;
          }
        }
        @keyframes delay-200 {
          0% {
            animation-delay: 0.2s;
          }
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
		</div>
	)
}

interface LoadingSplashProps {
	className?: string
}

export function LoadingSplash({ className }: LoadingSplashProps) {
	return (
		<div className={cn('fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2', className)}>
			<div className="relative h-16 w-16">
				<div className="absolute inset-0 rounded-full border-4 border-gray-100" />
				<div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-pink-500" />
				<div
					className="absolute inset-3 animate-spin rounded-full border-3 border-transparent border-b-rose-500"
					style={{ animationDirection: 'reverse' }}
				/>
			</div>
		</div>
	)
}
