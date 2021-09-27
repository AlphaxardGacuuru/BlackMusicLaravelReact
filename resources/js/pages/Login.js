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
	}

	return (
		<div>
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
											<Button type="submit" btnClass="mysonar-btn float-right" btnText={'Login'} />
										</div>
									</div>
								</form>
							</div>

						</div>
					</div>
				</div>
			</div>


			{/* Sliding Bottom Nav */}
			<div className="menu-open">
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="/">Login</a>
						</div>

						{/* <!-- Close Icon --> */}
						<div className="closeIcon p-2 float-right text-dark">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="currentColor"
								className="bi bi-x"
								viewBox="0 0 16 16">
								<path
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</div>
					</div>
					<div className="p-2">
						<GithubLoginButton className="mt-2" onClick={() => onSocial("github")} />
						<GoogleLoginButton className="mt-2" onClick={() => onSocial("google")} />
						<FacebookLoginButton className="mt-2" onClick={() => onSocial("facebook")} />
						<TwitterLoginButton className="mt-2" onClick={() => onSocial("twitter")} />
					</div>
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</div>
	)
}

export default Login