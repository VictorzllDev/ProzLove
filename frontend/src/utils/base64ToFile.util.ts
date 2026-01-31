export function base64ToFile(base64String: string, fileNameWithoutExt: string): File | null {
	try {
		// Expressões regulares para detectar formatos suportados
		const pngRegex = /^data:image\/png;base64,/
		const jpegRegex = /^data:image\/jpeg;base64,/
		const jpgRegex = /^data:image\/jpg;base64,/

		let mimeType: string
		let extension: string
		let cleanBase64: string

		// Detectar formato e extrair base64
		if (pngRegex.test(base64String)) {
			mimeType = 'image/png'
			extension = 'png'
			cleanBase64 = base64String.replace(pngRegex, '')
		} else if (jpegRegex.test(base64String) || jpgRegex.test(base64String)) {
			mimeType = 'image/jpeg'
			extension = base64String.includes('image/jpg') ? 'jpg' : 'jpeg'
			cleanBase64 = base64String.replace(jpegRegex, '').replace(jpgRegex, '')
		} else {
			// Formato não suportado
			return null
		}

		// Converter base64 para blob
		const byteCharacters = atob(cleanBase64)
		const byteNumbers = new Uint8Array(byteCharacters.length)

		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i)
		}

		// Criar o objeto File
		const blob = new Blob([byteNumbers], { type: mimeType })
		const fileName = `${fileNameWithoutExt}.${extension}`

		return new File([blob], fileName, { type: mimeType })
	} catch {
		return null
	}
}
