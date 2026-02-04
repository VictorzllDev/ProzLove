import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useAuth } from '@/contexts/AuthContext'
import type { IProfileWithStats } from '@/types/auth'
import { base64ToFile } from '@/utils/base64ToFile.util'
import { useGenerateUploadUrl } from '../photo/useGenerateUploadUrl'
import { useUpdateProfile } from './useUpdateProfile'

const profileFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, {
			message: 'O nome deve ter pelo menos 2 caracteres.',
		})
		.max(100, 'Nome muito longo'),
	bio: z
		.string()
		.trim()
		.min(1, {
			message: 'A biografia deve ter pelo menos 1 caracteres.',
		})
		.max(255, { message: 'Biografia muito longa.' }),
	birthday: z
		.date({
			message: 'Selecione uma data de nascimento valida.',
		})
		.refine((date) => {
			const today = new Date()
			const minDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
			return date <= minDate
		}, 'Você deve ter pelo menos 17 anos'),
	location: z.enum(
		[
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
		],
		{
			message: 'Selecione a cidade que voce faz curso.',
		},
	),
})

export type ProfileFormInputs = z.infer<typeof profileFormSchema>

export function useProfileForm() {
	const queryClient = useQueryClient()
	const profileCache = queryClient.getQueryData(['user-profile', 'me']) as IProfileWithStats
	const { profile: profileAuth } = useAuth()
	const profile = profileCache || profileAuth

	const updateProfile = useUpdateProfile()
	const generateUploadUrl = useGenerateUploadUrl()

	const [avatarUrl, setAvatarUrl] = useState<string>(profile?.photos.find((p) => p.isPrimary)?.url || '')

	const form = useForm<ProfileFormInputs>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: profile?.name,
			bio: profile?.bio,
			birthday: new Date(String(profile?.birthday)),
			location: profile?.location as ProfileFormInputs['location'],
		},
	})

	const onSubmit = async (input: ProfileFormInputs) => {
		await updateProfile.mutateAsync(input)

		const file = base64ToFile(avatarUrl, 'avatar')
		if (!file) return

		const { uploadUrl } = await generateUploadUrl.mutateAsync({
			fileType: file.type,
			isPrimary: true,
		})

		await fetch(uploadUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': file.type,
			},
			body: file,
		})
	}

	return { form, updateProfile, avatarUrl, setAvatarUrl, onSubmit }
}
