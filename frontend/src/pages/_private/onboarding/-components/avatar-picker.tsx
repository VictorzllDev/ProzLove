import { DialogClose } from '@radix-ui/react-dialog'
import { RotateCw, Trash2, Upload, ZoomIn, ZoomOut } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface AvatarPickerProps {
	onAvatarChange?: (avatarUrl: string) => void
	defaultAvatar?: string
}

export function AvatarPicker({ onAvatarChange, defaultAvatar }: AvatarPickerProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [avatarUrl, setAvatarUrl] = useState<string>('')
	const [uploadedImage, setUploadedImage] = useState<string>(defaultAvatar || '')
	const [zoom, setZoom] = useState(1)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isDragging, setIsDragging] = useState(false)
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
	const fileInputRef = useRef<HTMLInputElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const containerRef = useRef<HTMLButtonElement>(null)

	// Handle file selection
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setUploadedImage(e.target?.result as string)
				setZoom(1)
				setPosition({ x: 0, y: 0 })
			}
			reader.readAsDataURL(file)
		}
	}

	// Handle mouse down for dragging
	const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
		setIsDragging(true)
		setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
	}

	// Handle mouse move for dragging
	const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!isDragging) return
		setPosition({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y,
		})
	}

	// Handle mouse up
	const handleMouseUp = () => {
		setIsDragging(false)
	}

	// Handle zoom with mouse wheel
	const handleWheel = (e: React.WheelEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const delta = e.deltaY > 0 ? -0.1 : 0.1
		setZoom((prev) => Math.max(1, Math.min(3, prev + delta)))
	}

	// Crop and save avatar
	const cropAvatar = () => {
		if (!uploadedImage || !canvasRef.current) return

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const img = new Image()
		img.crossOrigin = 'anonymous'
		img.onload = () => {
			// Clear canvas
			ctx.fillStyle = '#ffffff'
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// Calculate the cropped area
			const size = Math.min(canvas.width, canvas.height)
			const sourceSize = Math.max(img.width, img.height) / zoom
			const sourceX = img.width / 2 - sourceSize / 2 - position.x / zoom
			const sourceY = img.height / 2 - sourceSize / 2 - position.y / zoom

			// Draw the cropped image
			ctx.drawImage(
				img,
				Math.max(0, sourceX),
				Math.max(0, sourceY),
				Math.min(img.width - Math.max(0, sourceX), sourceSize),
				Math.min(img.height - Math.max(0, sourceY), sourceSize),
				0,
				0,
				size,
				size,
			)

			// Save the avatar
			const newAvatarUrl = canvas.toDataURL('image/png')
			setAvatarUrl(newAvatarUrl)
			onAvatarChange?.(newAvatarUrl)
			setIsOpen(false)
		}
		img.src = uploadedImage
	}

	// Reset crop
	const resetCrop = () => {
		setUploadedImage('')
		setZoom(1)
		setPosition({ x: 0, y: 0 })
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<>
			<div className="flex flex-col items-center gap-6">
				<div className="relative">
					<div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-slate-200 to-slate-300 shadow-lg dark:from-slate-700 dark:to-slate-800">
						{avatarUrl ? (
							<img src={avatarUrl || '/placeholder.svg'} alt="User avatar" className="h-full w-full object-cover" />
						) : (
							<div className="text-slate-400 dark:text-slate-500">
								<svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
									<title>account</title>
									<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
								</svg>
							</div>
						)}
					</div>

					{/* Edit Button */}
					<Button
						onClick={() => setIsOpen(true)}
						type="button"
						className="absolute right-0 bottom-0 h-10 w-10 rounded-full bg-blue-600 p-0 shadow-lg transition-transform hover:scale-110 hover:bg-blue-700"
						title="Edit avatar"
					>
						<Upload className="h-5 w-5" />
					</Button>
				</div>
			</div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="w-full max-w-2xl">
					<DialogHeader>
						<DialogTitle>{uploadedImage ? 'Corte sua Foto' : 'Carregar Foto'}</DialogTitle>
						<DialogDescription>Escolha uma foto para o seu perfil</DialogDescription>
					</DialogHeader>

					{!uploadedImage ? (
						/* Upload Section */
						<div className="flex flex-col items-center justify-center gap-4 py-8">
							<div className="w-full rounded-lg border-2 border-slate-300 border-dashed p-8 text-center dark:border-slate-600">
								<Upload className="mx-auto mb-4 h-12 w-12 text-slate-400 dark:text-slate-500" />
								<p className="mb-2 font-medium text-lg text-slate-900 dark:text-slate-100">Upload your photo</p>
								<p className="mb-4 text-slate-600 text-sm dark:text-slate-400">Click to browse or drag and drop</p>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleFileSelect}
									className="hidden"
									id="avatar-input"
								/>
								<Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
									Choose File
								</Button>
							</div>
						</div>
					) : (
						/* Crop Section */
						<div className="flex flex-col gap-4">
							{/* Crop Preview */}
							<button
								type="button"
								ref={containerRef}
								className="relative cursor-move overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUp}
								onMouseLeave={handleMouseUp}
								onWheel={handleWheel}
								style={{ width: '100%', aspectRatio: '1', maxWidth: '400px', margin: '0 auto' }}
							>
								{/* Circular Crop Overlay */}
								<div className="pointer-events-none absolute inset-0 rounded-full border-4 border-white shadow-lg"></div>
								<div
									className="pointer-events-none absolute inset-0 rounded-full"
									style={{
										boxShadow: 'inset 0 0 0 999999px rgba(0, 0, 0, 0.5)',
									}}
								></div>

								{/* Image */}
								{uploadedImage && (
									<img
										src={uploadedImage || '/placeholder.svg'}
										alt="Crop preview"
										className="pointer-events-none absolute select-none"
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'contain',
											transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
											transformOrigin: 'center center',
											top: 0,
											left: 0,
										}}
										draggable={false}
									/>
								)}
							</button>

							{/* Crop Controls */}
							<div className="flex items-center justify-center gap-2">
								<Button
									onClick={() => setZoom((prev) => Math.max(1, prev - 0.1))}
									variant="outline"
									size="sm"
									className="h-9 w-9 p-0"
									title="Zoom out"
								>
									<ZoomOut className="h-4 w-4" />
								</Button>

								<div className="max-w-xs flex-1">
									<input
										type="range"
										min="1"
										max="3"
										step="0.1"
										value={zoom}
										onChange={(e) => setZoom(parseFloat(e.target.value))}
										className="w-full cursor-pointer"
									/>
								</div>

								<Button
									onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
									variant="outline"
									size="sm"
									className="h-9 w-9 p-0"
									title="Zoom in"
								>
									<ZoomIn className="h-4 w-4" />
								</Button>

								<Button
									onClick={() => {
										setZoom(1)
										setPosition({ x: 0, y: 0 })
									}}
									variant="outline"
									size="sm"
									title="Reset"
								>
									<RotateCw className="h-4 w-4" />
								</Button>

								<Button onClick={resetCrop} variant="outline">
									<Trash2 />
								</Button>
							</div>

							{/* Crop Info */}
							<p className="text-center text-slate-600 text-xs dark:text-slate-400">
								Drag to reposition • Scroll to zoom • Zoom: {zoom.toFixed(1)}x
							</p>

							{/* Action Buttons */}
							<div className="flex justify-end gap-3">
								<DialogClose asChild>
									<Button variant="outline">Cancelar</Button>
								</DialogClose>
								<Button onClick={cropAvatar} className="bg-blue-600 hover:bg-blue-700">
									Salvar Avatar
								</Button>
							</div>
						</div>
					)}

					{/* Hidden Canvas for Cropping */}
					<canvas ref={canvasRef} width={512} height={512} className="hidden"></canvas>
				</DialogContent>
			</Dialog>
		</>
	)
}
