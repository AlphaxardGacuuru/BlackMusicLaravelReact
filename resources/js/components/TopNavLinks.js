import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Img from "./Img"

const TopNavLinks = (props) => {

	axios.defaults.baseURL = props.url

	const [notifications, setNotifications] = useState(props.getLocalStorage("notifications"))
	const [bottomMenu, setBottomMenu] = useState()
	const [avatarVisibility, setAvatarVisibility] = useState("none")
	const [notificationVisibility, setNotificationVisibility] = useState("none")

	// Get number of items in video cart
	const vidCartItems = props.cartVideos.length
	const audCartItems = props.cartAudios.length
	const cartItems = vidCartItems + audCartItems

	useEffect(() => {
		// Fetch Notifications
		axios.get(`/api/notifications`)
			.then((res) => {
				setNotifications(res.data)
				setLocalStorage("notifications", res.data)
			}).catch(() => props.setErrors(['Failed to fetch notifications']))
	}, [])

	const logout = (e) => {
		e.preventDefault()

		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/logout`)
				.then((res) => {
					// Remove phone from localStorage
					localStorage.removeItem("auth")
					props.setMessage("Logged out")
					// Update Auth
					props.setAuth({
						"name": "Guest",
						"username": "@guest",
						"pp": "profile-pics/male_avatar.png",
						"account_type": "normal"
					})
				});
		})
	}

	const onNotification = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.put(`${props.url}/api/notifications/update`)
				.then((res) => {
					// Update notifications
					axios.get(`${props.url}/api/notifications`)
						.then((res) => setNotifications(res.data))
				})
		})
	}

	const onDeleteNotifications = (id) => {
		axios.delete(`${props.url}/api/notifications/${id}`)
			.then((res) => {
				// Update Notifications
				axios.get(`${props.url}/api/notifications`)
					.then((res) => setNotifications(res.data))
			})
	}

	/*
	*
	* PWA Install link */
	var toDownload = useRef(null)

	// Listen to the install prompt
	window.addEventListener('beforeinstallprompt', (e) => {
		// Show the button
		toDownload.current.style.display = 'block';
	});

	// Function to get to Privacy Policy
	const onPrivacyPolicy = () => window.location.href = "https://www.iubenda.com/privacy-policy/38639633"

	return (
		<>
			{/* Admin */}
			{props.auth.username == "@blackmusic" &&
				<Link to="/admin" className="mr-2">
					<svg className="bi bi-person"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd"
							d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
					</svg>
				</Link>}

			{/* Cart */}
			<div className="dropdown mr-2 hidden">
				<Link
					to="/cart"
					role="button"
					id="dropdownMenua"
					// data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					style={{
						textAlign: "center",
						fontWeight: "100",
						position: "relative",
					}}>
					<svg className="bi bi-cart3"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						fill="#fff"
						xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd"
							d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
					</svg>
				</Link>
				<span className="badge badge-danger rounded-circle hidden"
					style={{
						fontWeight: "100",
						position: "absolute",
						right: "-0.5rem",
						bottom: "0.5rem",
						border: "solid #232323"
					}}>
					{cartItems > 0 && cartItems}
				</span>
			</div>
			{/* Cart End */}

			{/* Notification Dropdown */}
			<div className="dropdown mr-2">
				<Link
					to="#"
					role="button"
					id="dropdownMenua"
					className="hidden"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					style={{
						textAlign: "center",
						fontWeight: "100",
						position: "relative",
					}}
					onClick={onNotification}>
					<svg className="bi bi-bell"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
						<path fillRule="evenodd"
							d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
					</svg>
				</Link>
				{/* For smaller screens */}
				<span
					className="anti-hidden m-2"
					style={{
						textAlign: "center",
						fontWeight: "100",
						position: "relative",
					}}
					onClick={() => {
						setBottomMenu("menu-open")
						setNotificationVisibility("block")
						setAvatarVisibility("none")
						// onNotification()
					}}>
					<svg className="bi bi-bell"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
						<path fillRule="evenodd"
							d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
					</svg>
				</span>
				<span className="badge badge-danger rounded-circle"
					style={{
						fontWeight: "100",
						position: "absolute",
						right: "-0.5rem",
						bottom: "0.5rem",
						border: "solid #232323"
					}}>
					{notifications.filter((notification) => !notification.isRead).length > 0 &&
						notifications.filter((notification) => !notification.isRead).length}
				</span>
				<div
					style={{ borderRadius: "0", backgroundColor: "#232323" }}
					className="dropdown-menu dropdown-menu-right m-0 p-0"
					aria-labelledby="dropdownMenuButton">
					<div className="dropdown-header border-bottom border-dark">Notifications</div>
					<div style={{ maxHeight: "500px", overflowY: "scroll" }}>
						{/* Get Notifications */}
						{notifications
							.map((notification, key) => (
								<Link
									key={key}
									to={notification.url}
									className="p-2 dropdown-item border-bottom text-dark border-dark"
									onClick={() => onDeleteNotifications(notification.id)}>
									<small>{notification.message}</small>
								</Link>
							))}
					</div>
					{notifications.length > 0 &&
						<div
							className="dropdown-header"
							style={{ cursor: "pointer" }}
							onClick={() => onDeleteNotifications(0)}>
							Clear notifications
						</div>}
				</div>
			</div>
			{/* Notification Dropdown End */}

			{/* Avatar Dropdown */}
			<div className="dropdown">
				<Link
					to="#"
					role="button"
					id="dropdownMenua"
					className="hidden"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false">
					<Img
						src={props.auth.pp}
						imgClass={"rounded-circle"}
						width="25px"
						height="25px"
						alt="Avatar" />
				</Link>
				{/* For small screens */}
				<span
					className="anti-hidden"
					onClick={() => {
						setBottomMenu("menu-open")
						setAvatarVisibility("block")
						setNotificationVisibility("none")
					}}>
					<Img
						src={props.auth.pp}
						imgClass="rounded-circle anti-hidden"
						width="25px"
						height="25px"
						alt="Avatar" />
				</span>
				<div
					style={{ borderRadius: "0", backgroundColor: "#232323" }}
					className="dropdown-menu dropdown-menu-right m-0 p-0"
					aria-labelledby="dropdownMenuButton">
					<Link to={`/profile/${props.auth.username}`} className="p-3 dropdown-item border-bottom border-dark">
						<h5>{props.auth.name}</h5>
						<h6>{props.auth.username}</h6>
					</Link>
					<Link
						ref={toDownload}
						to="/download-app"
						className="p-3 dropdown-item border-bottom border-dark"
						style={{ display: "none" }}>
						<h6>
							<span className="mr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-box-arrow-down"
									viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
									<path fillRule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
								</svg>
							</span>
							Get App
						</h6>
					</Link>
					<Link to='/videos' className="p-3 dropdown-item border-bottom border-dark">
						<h6>
							<span className="mr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-gear-fill"
									viewBox="0 0 16 16">
									<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
								</svg>
							</span>
							Studio
						</h6>
					</Link>
					<Link to='/settings' className="p-3 dropdown-item border-bottom border-dark">
						<h6>
							<span className="mr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-gear"
									viewBox="0 0 16 16">
									<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
									<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
								</svg>
							</span>
							Settings
						</h6>
					</Link>
					<Link
						to="#"
						className="p-3 dropdown-item border-bottom border-dark"
						title="Privacy Policy"
						onClick={onPrivacyPolicy}>
						<h6>
							<span className="mr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-shield-shaded"
									viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
								</svg>
							</span>
							Privacy Policy
						</h6>
					</Link>
					<Link
						to="#"
						className="p-3 dropdown-item"
						onClick={logout}>
						<h6>
							<span className="mr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-box-arrow-in-right"
									viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
									<path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
								</svg>
							</span>
							Logout
						</h6>
					</Link>
				</div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu} style={{ position: "fixed", left: "0" }}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							onClick={() => setBottomMenu("")}>
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

					{/* Avatar */}
					<div className="m-0 p-0" style={{ display: avatarVisibility }}>
						<Link
							to={`/profile/${props.auth.username}`}
							style={{ padding: "0px", margin: "0px" }}
							className="border-bottom border-dark"
							onClick={() => setBottomMenu("")}>
							<h5>{props.auth.name}</h5>
							<h6>{props.auth.username}</h6>
						</Link>
						<Link
							ref={toDownload}
							to="/download-app"
							className="p-3 border-bottom border-dark"
							style={{ display: "none" }}
							onClick={() => setBottomMenu("")}>
							<div className="d-flex justify-content-start">
								<div></div>
								<div>
									<span className="mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-box-arrow-down"
											viewBox="0 0 16 16">
											<path fillRule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
											<path fillRule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
										</svg>
									</span>
								</div>
								<div>
									<h6>
										Get App
									</h6>
								</div>
							</div>
						</Link>
						<Link
							to='/videos'
							className="p-3 border-bottom border-dark"
							onClick={() => setBottomMenu("")}>
							<h6>
								<span className="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-gear-fill"
										viewBox="0 0 16 16">
										<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
									</svg>
								</span>
								Studio
							</h6>
						</Link>
						<Link
							to='/settings'
							className="p-3 border-bottom border-dark"
							onClick={() => setBottomMenu("")}>
							<h6>
								<span className="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-gear"
										viewBox="0 0 16 16">
										<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
										<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
									</svg>
								</span>
								Settings
							</h6>
						</Link>
						<Link
							to="#"
							className="p-3 border-bottom border-dark"
							title="Privacy Policy"
							onClick={onPrivacyPolicy}>
							<h6>
								<span className="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-shield-shaded"
										viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
									</svg>
								</span>
								Privacy Policy
							</h6>
						</Link>
						<Link
							to="#"
							className="p-3"
							onClick={() => {
								setBottomMenu("")
								logout()
							}}>
							<h6>
								<span className="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-box-arrow-in-right"
										viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
										<path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
									</svg>
								</span>
								Logout
							</h6>
						</Link>
						<br />
						<br />
						<br />
					</div>
					{/* Avatar End */}

					{/* Notifications */}
					<div className="m-0 p-0" style={{ display: notificationVisibility }}>
						<div className="dropdown-header text-white">
							<h5 style={{ margin: "0px" }}>Notifications</h5>
						</div>
						<div style={{ maxHeight: "500px", overflowY: "scroll" }}>
							{/* Get Notifications */}
							{notifications
								.map((notification, key) => (
									<Link
										key={key}
										to={notification.url}
										className="p-2"
										style={{ display: "block" }}
										onClick={() => onDeleteNotifications(notification.id)}>
										<small>{notification.message}</small>
									</Link>
								))}
						</div>
						{notifications.length > 0 &&
							<div
								className="dropdown-header"
								style={{ cursor: "pointer" }}
								onClick={() => onDeleteNotifications(0)}>
								Clear notifications
							</div>}
						<br />
						<br />
						<br />
					</div>
					{/* Notifications End */}
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default TopNavLinks
