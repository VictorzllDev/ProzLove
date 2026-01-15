import type { UseFormReturn } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface IStageTwoForm {
	form: UseFormReturn<{
		name: string
		bio: string
		birthday: Date
		gender: string
	}>
}
export function StageTwoForm({ form }: IStageTwoForm) {
	const {
		register,
		formState: { errors },
	} = form

	return (
		<div className="space-y-2">
			<Label htmlFor="bio" className="flex flex-col font-semibold text-gray-700 text-sm">
				<Textarea placeholder="Type your message here." {...register('bio')} />
				{errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
			</Label>
		</div>
	)
}
