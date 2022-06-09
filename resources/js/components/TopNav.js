import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'

import AuthLinks from "./AuthLinks"
import TopnavLinks from "./TopNavLinks"
import Img from "./Img"

import CloseSVG from '../svgs/CloseSVG'
import LogoutSVG from '../svgs/LogoutSVG'
import DownloadSVG from '../svgs/DownloadSVG'
import PrivacySVG from '../svgs/PrivacySVG'
import SettingsSVG from '../svgs/SettingsSVG'
import StudioSVG from '../svgs/StudioSVG'

const TopNav = (props) => {

	axios.defaults.baseURL = props.url

	const [menu, setMenu] = useState("")

	const location = useLocation()

	const history = useHistory()

	const [bottomMenu, setBottomMenu] = useState("")
	const [avatarVisibility, setAvatarVisibility] = useState("none")
	const [notificationVisibility, setNotificationVisibility] = useState("none")
	const [notifications, setNotifications] = useState(props.getLocalStorage("notifications"))

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
					props.setMessages("Logged out")
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

	var display

	// Hide TopNav from various pages
	location.pathname.match("/privacy-policy") ||
		location.pathname.match("/download-app") ||
		location.pathname.match("/chat/") ||
		location.pathname.match("/post-edit") ||
		location.pathname.match("/post-create") ||
		location.pathname.match("/post-show/") ||
		location.pathname.match("/referral") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register") ?
		display = "none" : display = ""

	return (
		<>
			<div id="MyElement" style={{ display: display }} className={menu}>
				{/* <!-- ***** Main Menu Area Start ***** --> */}
				<div className="mainMenu d-flex align-items-center justify-content-between">
					{/* <!-- Close Icon --> */}
					<div className="closeIcon" onClick={() => setMenu("")}>
						<svg xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							fill="currentColor"
							className="bi bi-x"
							viewBox="0 0 16 16">
							<path
								d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
						</svg>
					</div>
					{/* <!-- Logo Area --> */}
					<div className="logo-area">
						<Link to="/">Black Music</Link>
					</div>
					{/* <!-- Nav --> */}
					<div className="sonarNav wow fadeInUp" data-wow-delay="1s">
						<nav>
							<ul>
								<li className='nav-item active'>
									<Link to='/'
										style={{ color: location.pathname == "/" ? "gold" : "white" }}
										className='nav-link'
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color: location.pathname == "/" ? "gold" : "white"
											}}>
											<svg className="bi bi-house" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
												<path fillRule="evenodd"
													d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
											</svg>
										</span>
										Home
									</Link>
								</li>
								<li className='nav-item active'>
									<Link to='/video-charts'
										style={{
											color: location.pathname == "/video-charts" ||
												location.pathname == "/audio-charts" ?
												"gold" : "white"
										}}
										className='nav-link'
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color: location.pathname == "/video-charts" ||
													location.pathname == "/audio-charts" ?
													"gold" : "white"
											}}>
											<svg className="bi bi-compass" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M8 15.016a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zm0 1a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" />
												<path
													d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1zm.94 6.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z" />
											</svg>
										</span>
										Discover
									</Link>
								</li>
								<li className='nav-item active'>
									<Link to='/library'
										style={{ color: location.pathname == "/library" ? "gold" : "white" }}
										className='nav-link'
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color: location.pathname == "/library" ? "gold" : "white"
											}}>
											<svg className="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
											</svg>
										</span>
										Library
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<br />
				</div>
				{/* <!-- ***** Main Menu Area End ***** --> */}

				{/* <!-- ***** Header Area Start ***** --> */}
				<header style={{ backgroundColor: "#232323" }} className="header-area">
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12" style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									{/* <!-- Logo Area  --> */}
									<div className="logo-area">
										<Link to="/">Black Music</Link>
									</div>
									{/* <-- Search Form --> */}
									<div className="contact-form hidden">
										<input
											name="search"
											className="form-control"
											placeholder="Search songs and artists"
											style={{
												textColor: "white",
												color: "white",
												width: "400px"
											}}
											onChange={(e) => {
												var regex = new RegExp(e.target.value, 'gi');
												props.setSearch(regex)
												history.push("/search")
											}} />
									</div>
									{/* Search Form End */}
									<div className="menu-content-area d-flex align-items-center">
										{/* <!-- Header Social Area --> */}
										<div className="header-social-area d-flex align-items-center">
											{props.auth.username == "@guest" ?
												<AuthLinks {...props} /> :
												<TopnavLinks
													{...props}
													bottomMenu={bottomMenu}
													setBottomMenu={setBottomMenu}
													avatarVisibility={avatarVisibility}
													setAvatarVisibility={setAvatarVisibility}
													notificationVisibility={notificationVisibility}
													setNotificationVisibility={setNotificationVisibility}
													notifications={notifications}
													setNotifications={setNotifications}
													vidCartItems={vidCartItems}
													audCartItems={audCartItems}
													cartItems={cartItems}
													logout={logout}
													onNotification={onNotification}
													onDeleteNotifications={onDeleteNotifications} />}
										</div>
										{/* <!-- Menu Icon --> */}
										<a href="#"
											className="hidden"
											id="menuIcon"
											onClick={(e) => {
												e.preventDefault()
												setMenu("menu-open")
											}}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="25"
												height="25"
												fill="#fff"
												className="bi bi-list"
												viewBox="0 0 16 16">
												<path fillRule="evenodd"
													d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
											</svg>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<br />
				<br />
				{/* Remove for profile page for better background image */}
				{location.pathname.match(/profile/) ||
					location.pathname.match(/video-charts/) ||
					location.pathname.match(/audio-charts/) ?
					<br className="hidden" /> :
					<span>
						<br />
						<br className="hidden" />
					</span>}
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						<div className="dropdown-header text-white">
							<h5 style={{ margin: "0px", display: notificationVisibility }}>Notifications</h5>
						</div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "1em" }}
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
							to="/download-app"
							className="p-3"
							style={{ display: props.downloadLink ? "inline" : "none", textAlign: "left" }}
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
							to="/privacy-policy"
							className="p-3"
							style={{ textAlign: "left" }}
							title="Privacy Policy">
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
					</div>
					{/* Avatar Bottom End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</>
	)
}

export default TopNav