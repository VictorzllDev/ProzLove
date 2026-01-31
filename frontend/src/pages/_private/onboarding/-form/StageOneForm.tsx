import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AvatarPicker } from '../-components/avatar-picker'

interface IStageOneForm {
	form: UseFormReturn<{
		name: string
		bio: string
		birthday: Date
		gender: 'MALE' | 'FEMALE'
	}>
	defaultAvatar: string
	onAvatarChange: (avatarUrl: string) => void
}

export function StageOneForm({ form, defaultAvatar, onAvatarChange }: IStageOneForm) {
	const [open, setOpen] = useState<boolean>(false)

	const {
		register,
		control,
		formState: { errors },
	} = form

	return (
		<>
			<div className="space-y-2">
				<AvatarPicker onAvatarChange={onAvatarChange} defaultAvatar={defaultAvatar} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="name" className="font-semibold text-gray-700 text-sm">
					Como você se chama?
				</Label>

				<Input id="name" placeholder="Seu primeiro nome" {...register('name')} />
				{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="birthday" className="font-semibold text-gray-700 text-sm">
					Qual sua data de nascimento?
				</Label>
				<Controller
					control={control}
					name="birthday"
					render={({ field }) => (
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button variant="outline" id="date" className="w-48 justify-between font-normal">
									{field.value ? field.value.toLocaleDateString('pt-BR') : 'Select date'}
									<ChevronDownIcon />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto overflow-hidden p-0" align="start">
								<Calendar
									mode="single"
									selected={field.value}
									captionLayout="dropdown"
									onSelect={(date) => {
										field.onChange(date)
										setOpen(false)
									}}
								/>
							</PopoverContent>
						</Popover>
					)}
				/>

				{errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="gender" className="font-semibold text-gray-700 text-sm">
					Eu sou...
				</Label>
				<Controller
					control={control}
					name="gender"
					render={({ field }) => (
						<Select value={field.value || ''} onValueChange={field.onChange}>
							<SelectTrigger id="gender">
								<SelectValue placeholder="Selecione seu gênero" />
							</SelectTrigger>
							<SelectContent className="rounded-xl">
								<SelectItem value="MALE" className="py-3">
									Homem
								</SelectItem>
								<SelectItem value="FEMALE" className="py-3">
									Mulher
								</SelectItem>
								<SelectItem value="1" className="py-3" disabled>
									Homem cisgênero
								</SelectItem>
								<SelectItem value="2" className="py-3" disabled>
									Mulher cisgênero
								</SelectItem>
								<SelectItem value="3" className="py-3" disabled>
									Homem trans
								</SelectItem>
								<SelectItem value="4" className="py-3" disabled>
									Mulher trans
								</SelectItem>
								<SelectItem value="5" className="py-3" disabled>
									Não-binário
								</SelectItem>
								<SelectItem value="6" className="py-3" disabled>
									Agênero
								</SelectItem>
								<SelectItem value="7" className="py-3" disabled>
									Gênero fluido
								</SelectItem>
								<SelectItem value="8" className="py-3" disabled>
									Bigênero
								</SelectItem>
								<SelectItem value="9" className="py-3" disabled>
									Gênero queer
								</SelectItem>
								<SelectItem value="10" className="py-3" disabled>
									Two-Spirit (Dois-Espíritos)
								</SelectItem>
								<SelectItem value="11" className="py-3" disabled>
									Demigênero
								</SelectItem>
								<SelectItem value="12" className="py-3" disabled>
									Andrógino
								</SelectItem>
								<SelectItem value="13" className="py-3" disabled>
									Pangênero
								</SelectItem>
								<SelectItem value="14" className="py-3" disabled>
									Intersexo
								</SelectItem>
								<SelectItem value="15" className="py-3" disabled>
									Gênero não-conforme
								</SelectItem>
								<SelectItem value="16" className="py-3" disabled>
									Questionando
								</SelectItem>
								<SelectItem value="17" className="py-3" disabled>
									Prefiro não informar
								</SelectItem>
								<SelectItem value="18" className="py-3" disabled>
									Outro
								</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
				{errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
			</div>
		</>
	)
}
