import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { base64ToFile } from '@/utils/base64ToFile.util'
import { useGenerateUploadUrl } from '../photo/useGenerateUploadUrl'
import { useCreateOnboarding } from './useCreateOnboarding'

const onboardingFormSchema = z.object({
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
	gender: z.enum(['MALE', 'FEMALE'], {
		message: 'Selecione um Genero.',
	}),
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

export type OnboardingFormInputs = z.infer<typeof onboardingFormSchema>

export function useOnboarding() {
	const createOnboarding = useCreateOnboarding()
	const generateUploadUrl = useGenerateUploadUrl()

	const [avatarUrl, setAvatarUrl] = useState<string>('')
	const [stage, setStage] = useState<number>(1)

	const form = useForm<OnboardingFormInputs>({
		resolver: zodResolver(onboardingFormSchema),
		defaultValues: {
			name: undefined,
			bio: undefined,
			birthday: undefined,
			gender: undefined,
			location: undefined,
		},
	})

	const onSubmit = async (input: OnboardingFormInputs) => {
		await createOnboarding.mutateAsync(input)

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

	async function handleNextStage() {
		let isValid = false

		switch (stage) {
			case 1:
				isValid = await form.trigger(['name', 'birthday', 'gender'])
				break
			case 2:
				isValid = await form.trigger('bio')
				break
			default:
				isValid = false
		}

		if (isValid) {
			setStage(stage + 1)
		}
	}

	return { form, stage, createOnboarding, avatarUrl, setAvatarUrl, onSubmit, handleNextStage }
}
