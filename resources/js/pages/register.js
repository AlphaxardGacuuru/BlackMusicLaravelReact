import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
// import Axios from "axios"

import Btn from "@/components/Core/Btn"

const Register = (props) => {
	const router = useHistory()

	var { name, email, avatar } = useParams()

	const [username, setUsername] = useState("")
	const [phone, setPhone] = useState("07")
	const [loading, setLoading] = useState(false)

	var referrer
	var page

	// Remove all spaces from avatar
	avatar = avatar?.replace(/\s/g, "/")

	// Show error on space in username
	useEffect(() => {
		// Get referrer
		referrer = sessionStorage.getItem("referrer")
		page = sessionStorage.getItem("page")

		username.indexOf(" ") > -1 &&
			props.setErrors(["Username cannot have spaces"])
	}, [username])

	const onUpdate = () => {
		// Get user id
		const id = props.users.find((user) => user.username == username).id

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/login`, {
				id: id,
				name: name,
				email: email,
				avatar: avatar,
				username: username,
				phone: phone,
				password: phone,
			})
				.then((res) => {
					props.setMessages(["Account Updated"])
					setTimeout(() => router.push("/"), 500)
				})
				.catch((err) => props.getErrors(err))
		})
	}

	const onRegister = () => {
		// Show loading button
		setLoading(true)

		// Register User
		Axios.post(`/register`, {
			name: name,
			email: email,
			avatar: avatar,
			username: username,
			phone: phone,
			password: phone,
			password_confirmation: phone,
			device_name: "deviceName",
		})
			.then((res) => {
				props.setLocalStorage("sanctumToken", res.data)
				// Add referrer if there's one
				referrer &&
					Axios.post(`${props.url}/api/referrals`, {
						referrer: referrer,
						username: username,
					})

				props.setMessages(["Account created"])
				// Redirect user
				setTimeout(() => (location.href = page ? page : "/"), 500)
				// Clear sessionStorage
				sessionStorage.clear("referrer")
				sessionStorage.clear("page")
				// Removing loading
				setLoading(false)
			})
			.catch((err) => {
				props.getErrors(err)
				// Removing loading
				setLoading(false)
			})
	}

	const onSubmit = (e) => {
		e.preventDefault()

		// Check if phone exists
		if (props.users.some((user) => user.phone == phone)) {
			// onUpdate()
			onRegister()
		} else if (
			props.users.some((user) => user.username == username && user.id < 235)
		) {
			// If user in older than id 100 allow
			// onUpdate()
			onRegister()
		} else {
			onRegister()
		}
	}

	return (
		<div
			className="sonar-call-to-action-area section-padding-0-100"
			style={{ background: "rgba(0, 0, 0, 1)" }}>
			<div className="backEnd-content">
				<h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>Black Music</h2>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div
							className="call-to-action-content wow fadeInUp"
							data-wow-delay="0.5s">
							<h2 className="mt-2" style={{ color: "#FFD700" }}>
								Register
							</h2>

							<div className="card-body mycontact-form">
								<form method="POST" action="" onSubmit={onSubmit}>
									<div className="form-group row">
										<label
											htmlFor="username"
											className="col-md-4 col-form-label text-md-right">
											<p style={{ color: "#FFD700" }}>
												Create a unique username
											</p>
										</label>

										<div className="col-md-6">
											<input
												id="username"
												type="text"
												className="my-form"
												style={{
													color: "#FFD700",
													borderColor: "#FFD700",
												}}
												name="username"
												placeholder="@johndoe"
												onChange={(e) => setUsername(e.target.value)}
												// required
												autoFocus
											/>
										</div>
									</div>

									<div className="form-group row">
										<label
											htmlFor="phone"
											className="col-md-4 col-form-label text-md-right">
											<p style={{ color: "#FFD700" }}>
												Enter your Safaricom number
											</p>
										</label>

										<div className="col-md-6">
											<input
												id="phone"
												type="text"
												className="my-form"
												style={{
													color: "#FFD700",
													borderColor: "#FFD700",
												}}
												name="phone"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												required
											/>
										</div>
									</div>

									<div className="form-group row mb-0">
										<label
											htmlFor="phone"
											className="col-md-4 col-form-label text-md-right"></label>
										<div className="col-md-6">
											<Btn
												type="submit"
												btnClass="sonar-btn gold-btn float-end"
												btnText="register"
												loading={loading}
											/>
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
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

export default Register
