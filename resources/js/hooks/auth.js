import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated, setLogin } = {}) => {

	const router = useRouter()

	var { data: auth, error, mutate } = useSWR('/api/auth', () =>
		axios
			.get('/api/auth')
			.then(res => res.data.data)
			.catch(error => {
				if (error.response.status !== 409) throw error

				// router.push('/verify-email')
			}),
	)

	const csrf = () => axios.get('/sanctum/csrf-cookie')

	const register = async ({ setErrors, ...props }) => {
		await csrf()

		setErrors([])

		axios
			.post('/register', props)
			.then(() => {
				mutate()
				// router.push("/")
			}).catch(error => {
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	const login = async ({ setErrors, setStatus, ...props }) => {
		await csrf()

		setErrors([])
		setStatus(null)

		axios
			.post('/login', props)
			.then(() => {
				mutate()
				setLogin(false)
			}).catch(error => {
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	// const forgotPassword = async ({ setErrors, setStatus, email }) => {
	// 	await csrf()

	// 	setErrors([])
	// 	setStatus(null)

	// 	axios
	// 		.post('/forgot-password', { email })
	// 		.then(response => setStatus(response.data.status))
	// 		.catch(error => {
	// 			if (error.response.status !== 422) throw error

	// 			setErrors(error.response.data.errors)
	// 		})
	// }

	// const resetPassword = async ({ setErrors, setStatus, ...props }) => {
	// 	await csrf()

	// 	setErrors([])
	// 	setStatus(null)

	// 	axios
	// 		.post('/reset-password', { token: router.query.token, ...props })
	// 		.then(response => router.push('/login?reset=' + btoa(response.data.status)))
	// 		.catch(error => {
	// 			if (error.response.status !== 422) throw error

	// 			setErrors(error.response.data.errors)
	// 		})
	// }

	// const resendEmailVerification = ({ setStatus }) => {
	// 	axios
	// 		.post('/email/verification-notification')
	// 		.then(response => setStatus(response.data.status))
	// }

	const logout = async () => {
		if (!error) {
			await axios
				.post('/logout')
				.then(() => mutate())
		}

		// Reload Window to update auth object
		// window.location.pathname = '/login'
		location.reload()
		setLogin(true)
	}

	useEffect(() => {
		// if (middleware === 'guest' && redirectIfAuthenticated && auth) router.push(redirectIfAuthenticated)
		// if (window.location.pathname === "/verify-email" && auth?.email_verified_at) router.push(redirectIfAuthenticated)
		if (middleware === 'auth' && error) logout()
	}, [auth, error])

	return {
		auth,
		register,
		login,
		// forgotPassword,
		// resetPassword,
		// resendEmailVerification,
		logout
	}
}
