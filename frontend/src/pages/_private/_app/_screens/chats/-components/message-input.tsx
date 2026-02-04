import { Send } from 'lucide-react'
import { type KeyboardEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MessageInputProps {
	onSend: (text: string) => void
	disabled?: boolean
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
	const [input, setInput] = useState('')

	const handleSend = () => {
		if (!input.trim() || disabled) return

		onSend(input)
		setInput('')
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	const isDisabled = disabled || !input.trim()

	return (
		<div className="fixed bottom-0 w-full border-border border-t bg-background p-4">
			<div className="mx-auto flex max-w-4xl items-center gap-2">
				<Input
					type="text"
					placeholder="Digite sua mensagem..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					className="flex-1 border-border bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
				/>

				<Button
					onClick={handleSend}
					disabled={isDisabled}
					size="icon"
					aria-label="Enviar mensagem"
					className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
				>
					<Send className="h-5 w-5" />
				</Button>
			</div>
		</div>
	)
}
