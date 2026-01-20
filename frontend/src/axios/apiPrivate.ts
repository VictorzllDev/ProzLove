import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { getAuth } from 'firebase/auth'
import { env } from '../env'

export const apiPrivate: AxiosInstance = axios.create({
	baseURL: env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

apiPrivate.interceptors.request.use(
	async (config) => {
		try {
			const auth = getAuth()
			const user = auth.currentUser

			if (user) {
				const token = await user.getIdToken()
				config.headers.Authorization = `Bearer ${token}`
			}
		} catch (error) {
			console.error('Erro ao obter token:', error)
		}

		return config
	},
	(error) => Promise.reject(error),
)

apiPrivate.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

		if (error.response?.status === 401 && !originalRequest?._retry) {
			originalRequest._retry = true

			try {
				const auth = getAuth()
				const user = auth.currentUser

				if (user) {
					const newToken = await user.getIdToken(true)

					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${newToken}`
					}

					return apiPrivate(originalRequest)
				}
			} catch (refreshError) {
				console.error('Erro ao refresh token:', refreshError)
				if (typeof window !== 'undefined') {
					window.location.href = '/sign-in'
				}
			}
		}

		return Promise.reject(error)
	},
)
