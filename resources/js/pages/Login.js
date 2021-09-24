import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
	GithubLoginButton,
	GoogleLoginButton,
	FacebookLoginButton,
	TwitterLoginButton
} from "react-social-login-buttons";
import axios from 'axios';

import Button from '../components/Button'

const Login = ({ setMessage, setErrors, setAuth, url }) => {

	const [phone, setPhone] = useState('07')

	const history = useHistory()

	const onSubmit = (e) => {
		e.preventDefault()

		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${url}/api/login`, {
				phone: phone,
				password: phone,
				remember: 'checked'
			}).then(res => {
				// const resStatus = res.statusText
				setMessage("Logged in")
				axios.get(`${url}/api/home`).then((res) => setAuth(res.data))
				setTimeout(() => history.push('/'), 1000)
			}).catch(err => {
				const resErrors = err.response.data.errors
				// Get validation errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				setErrors(newError)
			});
		});

		setPhone('07')
	}

	const onSocial = (website) => {
		window.location.href = `${url}/api/login/${website}`

		// axios.get('/sanctum/csrf-cookie').then(() => {
		// 	axios.get(`${url}/api/home/${website}`)
		// 		.then((res) => console.log(res.response.data.message))
		// 		.catch((err) => console.log(err.response.data.errors))
		// })
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-header">Login</div>

						<div className="card-body contact-form">
							<form method="POST" action="" onSubmit={onSubmit}>
								<div className="form-group row">
									<label htmlFor="phone" className="col-md-4 col-form-label text-md-right">
										<p>Phone</p>
									</label>

									<div className="col-md-6">
										<input
											id="phone"
											type="text"
											className="form-control"
											name="phone"
											value={phone}
											onChange={(e) => { setPhone(e.target.value) }}
											required={true}
											autoComplete="phone"
											autoFocus={true} />
									</div>
								</div>

								<div className="form-group row mb-0">
									<div className="col-md-8 offset-md-4">
										<Button type="submit" btnText={'Login'} />
									</div>
								</div>
							</form>
						</div>
						
					</div>
				</div>
			</div>

			{/* <div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8">
					<GithubLoginButton className="mt-2" onClick={() => onSocial("github")} />
					<GoogleLoginButton className="mt-2" onClick={() => onSocial("google")} />
					<FacebookLoginButton className="mt-2" onClick={() => onSocial("facebook")} />
					<TwitterLoginButton className="mt-2" onClick={() => onSocial("twitter")} />
				</div>
				<div className="col-sm-2"></div>
			</div> */}
		</div>
	)
}

export default Login