import React from 'react'
import { Link } from 'react-router-dom'
import Img from "./Img"

const TopNavLinks = (props) => {

	// Get number of items in video cart
	const vidCartItems = props.cartVideos.filter((cartVideo) => cartVideo.username == props.auth.username).length
	const audCartItems = props.cartAudios.filter((cartAudio) => cartAudio.username == props.auth.username).length
	const cartItems = vidCartItems + audCartItems

	const logout = (e) => {
		e.preventDefault()

		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/logout`)
				.then(res => {
					props.setMessage("Logged out")
					axios.get(`${props.url}/api/home`).then((res) => props.setAuth({
						"name": "Guest",
						"username": "@guest",
						"pp": "profile-pics/male_avatar.png",
						"account_type": "normal"
					}))
				})
				.catch(err => {
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					props.setErrors(newError)
				});
		});
	}

	// Install button
	let deferredPrompt;
	// Listen to the install prompt
	window.addEventListener('beforeinstallprompt', (e) => {
		deferredPrompt = e;
		// Show the button
		btnAdd.style.display = 'block';

		// Action when button is clicked
		btnAdd.addEventListener('click', (e) => {
			// Show install banner
			deferredPrompt.prompt();
			// Check if the user accepted
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					btnAdd.innerHTML = 'User accepted';
				}
				deferredPrompt = null;
			});

			window.addEventListener('appinstalled', (evt) => {
				btnAdd.innerHTML = 'Installed';
			});
		});
	});

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
			<Link to="/cart" className="hidden" aria-expanded="false">
				<svg className="bi bi-cart3"
					width="1em"
					height="1em"
					viewBox="0 0 16 16"
					fill="#fff"
					xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd"
						d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
				</svg>
				<span className="badge badge-danger rounded-circle"
					style={{
						fontWeight: "100",
						position: "absolute",
						right: "10.5em",
						top: "0.5em",
						border: "solid #232323"
					}}>
					{cartItems > 0 && cartItems}
				</span>
			</Link>
			{/* Cart End */}

			{/* Notification Dropdown */}
			<div className="dropdown mr-2">
				<Link to="#"
					role="button"
					id="dropdownMenuLink"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					style={{
						textAlign: "center",
						fontWeight: "100",
						position: "relative",
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
				</Link>
				<span className="badge badge-danger rounded-circle"
					style={{
						fontWeight: "100",
						position: "absolute",
						right: "0rem",
						bottom: "0.5rem",
						border: "solid #232323"
					}}>
					4
				</span>
				<div style={{ borderRadius: "0" }}
					className="dropdown-menu dropdown-menu-right m-0 p-0"
					aria-labelledby="dropdownMenuButton">
					<div className="dropdown-header">Notifications</div>
					<div style={{ maxHeight: "500px", overflowY: "scroll" }}>

						{/* Get Notifications */}
						{props.notifications
							.filter((notification) => notification.username == props.auth.username)
							.map((notification, key) => (
								<Link key={key} to={`/profile/`} className="p-3 dropdown-item border-bottom text-dark">
									<h6>{notification.message}</h6>
								</Link>
							))}

						{/* Get Decos */}
						<div className="dropdown-header">Decos</div>
						{props.decoNotifications
							.filter((decoNotification) => decoNotification.username == props.auth.username)
							.map((decoNotification, key) => (
								<Link key={key} to={`/profile/`} className="p-3 dropdown-item border-bottom text-dark">
									<h6>{decoNotification.artist} just Decorated you.</h6>
								</Link>
							))}

						{/* Get Follow Notifications */}
						<div className="dropdown-header">New Fans</div>
						{props.followNotifications
							.filter((followNotification) => followNotification.username == props.auth.username)
							.map((followNotification, key) => (
								<Link key={key} to={`/profile/`} className="p-3 dropdown-item border-bottom text-dark">
									<h6>{followNotification.follower} became a fan.</h6>
								</Link>
							))}

						<div className="dropdown-header">Songs Bought</div>
						{/* Get Video Notifications */}
						{props.videoNotifications
							.filter((videoNotification) => videoNotification.artist == props.auth.username)
							.map((videoNotification, key) => (
								<Link key={key} to={`/profile/`} className="p-3 dropdown-item border-bottom text-dark">
									<h6>{videoNotification.username} just bought {videoNotification.video_id}</h6>
								</Link>
							))}

						{/* Get Audio Notifications */}
						{props.audioNotifications
							.filter((audioNotification) => audioNotification.artist == props.auth.username)
							.map((audioNotification, key) => (
								<Link key={key} to={`/profile/`} className="p-3 dropdown-item border-bottom text-dark">
									<h6>{audioNotification.username} just bought {audioNotification.audio_id}</h6>
								</Link>
							))}
					</div>
				</div>
			</div>
			{/* Notification Dropdown End */}

			{/* Avatar Dropdown */}
			<div className="dropdown">
				<a href="#"
					role="button"
					id="dropdownMenuLink"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false">
					<Img src={props.auth.pp.match(/http/) ?
						props.auth.pp :
						`/storage/${props.auth.pp}`}
						imgClass={"rounded-circle"}
						width="25px"
						height="25px"
						alt="Avatar" />
				</a>
				<div style={{ borderRadius: "0" }}
					className="dropdown-menu dropdown-menu-right m-0 p-0"
					aria-labelledby="dropdownMenuButton">
					<Link to={`/profile/${props.auth.username}`} className="p-3 dropdown-item border-bottom">
						<h5>{props.auth.name}</h5>
						<h6>{props.auth.username}</h6>
					</Link>
					<Link to='#'
						id="btnAdd"
						className="p-3 dropdown-item border-bottom"
						style={{ display: "none" }}>
						<h6>Get App
							<svg xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-plus"
								viewBox="0 0 16 16">
								<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
							</svg>
						</h6>
					</Link>
					<Link to='/videos' className="p-3 dropdown-item border-bottom">
						<h6>Studio</h6>
					</Link>
					<Link to="/home/create" className="p-3 dropdown-item border-bottom">
						<h6>Settings</h6>
					</Link>
					<Link to="/help" className="p-3 dropdown-item border-bottom">
						<h6>Help Centre</h6>
					</Link>
					<a href="#" className="p-3 dropdown-item" onClick={logout}>
						<h6>Logout</h6>
					</a>
				</div>
			</div>
		</>
	)
}

export default TopNavLinks
