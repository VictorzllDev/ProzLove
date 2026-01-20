import axios, { type AxiosInstance } from 'axios'
import { env } from '../env'

export const apiClientService: AxiosInstance = axios.create({
	baseURL: env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
