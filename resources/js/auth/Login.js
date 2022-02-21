import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
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
			}).then((res) => {
				// const resStatus = res.statusText
				setMessage("Logged in")
				// Update Logged in user
				axios.get(`${url}/api/home`)
					.then((res) => setAuth(res.data))
				// Redirect and reload page
				setTimeout(() => {
					history.push('/')
					location.reload()
				}, 1000)
			}).catch(err => {
				const resErrors = err.response.data.errors
				// Get validation errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				// newError.push(err.response.data.message)
				setErrors(newError)
			});
		});

		setPhone('07')
	}

	return (
		<div>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="rounded-0" style={{ backgroundColor: "#232323" }}>
							<div className="card-header text-white">Login</div>
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
												style={{ color: "#fff", backgroundColor: "fff" }}
												name="phone"
												value={phone}
												onChange={(e) => { setPhone(e.target.value) }}
												required={true}
												autoComplete="phone" />
										</div>
									</div>

									<div className="form-group row mb-0">
										<div className="col-md-8 offset-md-4">
											<Button type="submit" btnClass="mysonar-btn white-btn float-right" btnText={'Login'} />
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login