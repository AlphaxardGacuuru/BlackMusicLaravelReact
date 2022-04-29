import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Img from "./Img"

import PersonSVG from '../svgs/PersonSVG'
import CartSVG from '../svgs/CartSVG'
import BellSVG from '../svgs/BellSVG'
import LogoutSVG from '../svgs/LogoutSVG'
import CloseSVG from '../svgs/CloseSVG'
import DownloadSVG from '../svgs/DownloadSVG'
import PrivacySVG from '../svgs/PrivacySVG'
import SettingsSVG from '../svgs/SettingsSVG'
import StudioSVG from '../svgs/StudioSVG'

const TopNavLinks = (props) => {

	axios.defaults.baseURL = props.url

	const [notifications, setNotifications] = useState(props.getLocalStorage("notifications"))
	const [bottomMenu, setBottomMenu] = useState("")
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
				props.setLocalStorage("notifications", res.data)
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
					<PersonSVG />
				</Link>}

			{/* Cart */}
			<div className="dropdown mr-3 hidden">
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
					<CartSVG />
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
			<div className="dropdown mr-3">
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
					<BellSVG />
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
						onNotification()
					}}>
					<BellSVG />
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
								// onClick={() => onDeleteNotifications(notification.id)}
								>
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
						imgClass="rounded-circle"
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
					<Link
						to={`/profile/${props.auth.username}`}
						className="p-3 dropdown-item border-bottom border-dark">
						<div className="d-flex">
							<div>
								<Img
									src={props.auth.pp}
									imgClass="rounded-circle"
									width="25px"
									height="25px"
									alt="Avatar" />
							</div>
							<div className="pl-2">
								<h5>{props.auth.name}</h5>
								<h6>{props.auth.username}</h6>
							</div>
						</div>
					</Link>
					<Link
						ref={toDownload}
						to="/download-app"
						className="p-3 dropdown-item border-bottom border-dark"
						style={{ display: "none" }}>
						<h6>
							<span className="mr-2"><DownloadSVG /></span>
							Get App
						</h6>
					</Link>
					<Link to='/videos' className="p-3 dropdown-item border-bottom border-dark">
						<h6>
							<span className="mr-2"><StudioSVG /></span>
							Studio
						</h6>
					</Link>
					<Link to='/settings' className="p-3 dropdown-item border-bottom border-dark">
						<h6>
							<span className="mr-2"><SettingsSVG /></span>
							Settings
						</h6>
					</Link>
					<Link
						to="#"
						className="p-3 dropdown-item border-bottom border-dark"
						title="Privacy Policy"
						onClick={onPrivacyPolicy}>
						<h6>
							<span className="mr-2"><PrivacySVG /></span>
							Privacy Policy
						</h6>
					</Link>
					<Link
						to="#"
						className="p-3 dropdown-item"
						onClick={logout}>
						<h6>
							<span className="mr-2"><LogoutSVG /></span>
							Logout
						</h6>
					</Link>
				</div>
			</div>
			{/* Avatar Dropdown End */}

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu} style={{ position: "fixed", left: "0" }}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						<div className="dropdown-header text-white">
							<h5 style={{ margin: "0px", display: notificationVisibility }}>Notifications</h5>
						</div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Notifications Bottom */}
					<div className="m-0 p-0" style={{ display: notificationVisibility }}>
						<div style={{ maxHeight: "500px", overflowY: "scroll" }}>
							{/* Get Notifications */}
							{notifications
								.map((notification, key) => (
									<Link
										key={key}
										to={notification.url}
										className="p-2"
										style={{ display: "block", textAlign: "left" }}
										onClick={() => {
											setBottomMenu("")
											// onDeleteNotifications(notification.id)
										}}>
										<small>{notification.message}</small>
									</Link>
								))}
						</div>
						{notifications.length > 0 &&
							<div
								className="dropdown-header"
								style={{ cursor: "pointer" }}
								onClick={() => {
									setBottomMenu("")
									onDeleteNotifications(0)
								}}>
								Clear notifications
							</div>}
						<br />
						<br />
						<br />
					</div>
					{/* Notifications Bottom End */}

					{/* Avatar Bottom */}
					<div className="m-0 p-0" style={{ display: avatarVisibility }}>
						<Link
							to={`/profile/${props.auth.username}`}
							style={{ padding: "0px", margin: "0px", textAlign: "left" }}
							className="border-bottom"
							onClick={() => setBottomMenu("")}>
							<h5>
								<span className="ml-3 mr-3">
									<Img
										src={props.auth.pp}
										imgClass="rounded-circle"
										width="25px"
										height="25px"
										alt="Avatar" />
								</span>
								{props.auth.name} <small>{props.auth.username}</small>
							</h5>
						</Link>
						<Link
							ref={toDownload}
							to="/download-app"
							className="p-3"
							style={{ display: "none", textAlign: "left" }}
							onClick={() => setBottomMenu("")}>
							<h6><span className="ml-3 mr-4"><DownloadSVG /></span>Get App</h6>
						</Link>
						<Link
							to='/videos'
							className="p-3"
							style={{ textAlign: "left" }}
							onClick={() => setBottomMenu("")}>
							<h6><span className="ml-3 mr-4"><StudioSVG /></span>Studio</h6>
						</Link>
						<Link
							to='/settings'
							className="p-3"
							style={{ textAlign: "left" }}
							onClick={() => setBottomMenu("")}>
							<h6><span className="ml-3 mr-4"><SettingsSVG /></span>Settings</h6>
						</Link>
						<Link
							to="#"
							className="p-3"
							style={{ textAlign: "left" }}
							title="Privacy Policy"
							onClick={onPrivacyPolicy}>
							<h6><span className="ml-3 mr-4"><PrivacySVG /></span>Privacy Policy</h6>
						</Link>
						<Link
							to="#"
							className="p-3"
							style={{ textAlign: "left" }}
							onClick={(e) => {
								setBottomMenu("")
								logout(e)
							}}>
							<h6><span className="ml-3 mr-4"><LogoutSVG /></span>Logout</h6>
						</Link>
						<br />
						<br />
						<br />
					</div>
					{/* Avatar Bottom End */}
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default TopNavLinks
