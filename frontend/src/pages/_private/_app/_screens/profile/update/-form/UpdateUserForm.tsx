import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { AvatarPicker } from '@/components/shared/avatar-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { ProfileFormInputs } from '@/hooks/profile/useProfileForm'

interface IUpdateUserProps {
	form: UseFormReturn<ProfileFormInputs>
	defaultAvatar: string
	onAvatarChange: (avatarUrl: string) => void
}

export function UpdateUserForm({ form, defaultAvatar, onAvatarChange }: IUpdateUserProps) {
	const [open, setOpen] = useState<boolean>(false)
	const locations = [
		'Belo Horizonte - MG',
		'Uberlandia - MG',
		'Montes Claros - MG',
		'Juiz de Fora - MG',
		'Divinopolis - MG',
		'Contagem - MG',
		'Itaquera - SP',
		'São Miguel Paulista - SP',
		'Santo Amaro - SP',
		'Sacomã - SP',
		'Mauá - SP',
		'Jabaquara - SP',
		'Guarulhos - SP',
		'Guaianases - SP',
		'Grajaú - SP',
		'Diadema - SP',
		'Carapicuíba - SP',
	]

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
				<Label htmlFor="city" className="font-semibold text-gray-700 text-sm">
					De qual Proz você é?
				</Label>
				<Controller
					control={control}
					name="location"
					render={({ field }) => (
						<Select value={field.value || ''} onValueChange={field.onChange}>
							<SelectTrigger id="gender">
								<SelectValue placeholder="Selecione sua cidade" />
							</SelectTrigger>
							<SelectContent className="rounded-xl">
								{locations.map((city) => (
									<SelectItem key={city} value={city} className="py-3">
										{city}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				{errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="bio" className="flex flex-col font-semibold text-gray-700 text-sm">
					<Textarea placeholder="Type your message here." {...register('bio')} />
					{errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
				</Label>
			</div>
		</>
	)
}
