import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../components/Button'

const Register = ({ setMessage, setErrors, setAuth }) => {

	const [username, setUsername] = useState()
	const [phone, setPhone] = useState('07')
	const history = useHistory()

	const onSubmit = (e) => {
		e.preventDefault()

		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post('http://localhost:8000/api/register', {
				username: username,
				phone: phone,
				password: phone,
				password_confirmation: phone,
			})
				.then(res => {
					const resStatus = res.statusText
					setMessage("Account created")
					axios.get('http://localhost:8000/api/home').then((res) => setAuth([res.data]))
					setTimeout(() => history.push('/'), 1000)
				})
				.catch(err => {
					const resErrors = err.response.data.errors

					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					setErrors(newError)
				});
		});

		setPhone('07')
	}
	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-header">Register</div>

						<div className="card-body contact-form">
							<form method="POST" action="" onSubmit={onSubmit}>
								<div className="form-group row">
									<label htmlFor="username" className="col-md-4 col-form-label text-md-right">
										<p>Username</p>
									</label>

									<div className="col-md-6">
										<input id="username" type="text"
											className="form-control" name="username"
											placeholder="username" onChange={(e) => { setUsername(e.target.value) }} required autoComplete="username" autoFocus />
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="phone" className="col-md-4 col-form-label text-md-right">
										<p>Phone</p>
									</label>

									<div className="col-md-6">
										<input id="phone" type="text" className="form-control"
											name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} required autoComplete="phone" autoFocus />
									</div>
								</div>

								<div className="form-group row mb-0">
									<div className="col-md-8 offset-md-4">
										<Button type="submit" btnText={'Register'} />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
