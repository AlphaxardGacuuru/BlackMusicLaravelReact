import React, { useState } from 'react'

import {
	GoogleLoginButton,
	FacebookLoginButton,
	TwitterLoginButton
} from "react-social-login-buttons";
import axios from 'axios';

import Button from '../components/button'
import { Link } from 'react-router-dom';
import CloseSVG from '../svgs/CloseSVG';

const LoginPopUp = (props) => {

	const onSocial = (website) => {
		window.location.href = `${props.url}/api/login/${website}`

		// axios.get(`${props.url}/api/login/${website}`)
		// .then((res) => console.log(res.data))
	}

	const [phone, setPhone] = useState('07')
	const [phoneLogin, setPhoneLogin] = useState(false)

	const onSubmit = (e) => {
		e.preventDefault()

		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/login`, {
				phone: phone,
				password: phone,
				remember: 'checked'
			}).then(res => {
				props.setLogin(false)
				props.setMessages(["Logged in"])
				// Update Logged in user
				axios.get(`${props.url}/api/home`)
					.then((res) => props.setAuth(res.data))
				// Save phone to Local Storage
				localStorage.setItem("phone", phone)
				// Reload page
				setTimeout(() => location.reload(), 1000)
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
				props.setErrors(newError)
			});
		});

		setPhone('07')
	}

	return (
		<>
			<div id="preloader">
				<div className="preload-content">
					{/* <div id="sonar-load"></div> */}
				</div>
			</div>
			<div className="menu-open">
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Login</a>
						</div>
						{/* <!-- Close Icon --> */}
						<div
							className="p-2"
							style={{ fontSize: "1em" }}>
							<Link to="/" style={{ color: "#fff" }}>
								<CloseSVG />
							</Link>
						</div>
					</div>
					<div className="p-2">
						{phoneLogin ?
							<center>
								<div className="contact-form">
									<form method="POST" action="" onSubmit={onSubmit}>
										<input
											id="phone"
											type="text"
											className="form-control"
											name="phone"
											value={phone}
											onChange={(e) => { setPhone(e.target.value) }}
											required={true}
											autoComplete="phone"
											autoFocus />
										<br />

										<Button type="submit"
											btnClass="mysonar-btn float-right"
											btnText={'Login'} />
									</form>
									<br />
									<br />

									{/* <Button
										btnClass="mysonar-btn"
										btnText="back"
										onClick={() => setPhoneLogin(false)} /> */}
								</div>
							</center> :
							<>
								<GoogleLoginButton
									className="mt-2 rounded-0"
									onClick={() => onSocial("google")} />
								{/* <FacebookLoginButton className="mt-2 rounded-0" onClick={() => onSocial("facebook")} /> */}
								<TwitterLoginButton
									className="mt-2 rounded-0"
									onClick={() => onSocial("twitter")} />
								<br />

								<Button
									btnClass="mysonar-btn"
									btnText="login with number"
									onClick={() => setPhoneLogin(true)} />
							</>}
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPopUp
