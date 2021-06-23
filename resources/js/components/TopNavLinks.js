import React from 'react'
import { Link } from 'react-router-dom'
import Img from "./Img"

const TopNavLinks = (props) => {

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
					console.log(err)
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
	return (
		<>
			{/* Admin */}
			<Link to="/admin" className="mr-2">
				<svg className="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16"
					fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd"
						d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
				</svg>
			</Link>

			{/* Cart Dropdown */}
			<div className="dropdown mr-2">
				<a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">
					<svg className="bi bi-cart3" width="1em" height="1em" viewBox="0 0 16 16"
						fill="#fff" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd"
							d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
					</svg>
				</a>
				<span className="badge badge-danger rounded-circle hidden"
					style={{ padding: "3px 5px", position: "absolute", right: "-3px", top: "-3px", border: "solid #232323" }}>

				</span>
				<div style={{ borderRadius: "0" }} className="dropdown-menu dropdown-menu-right"
					aria-labelledby="dropdownMenuButton">
					<a className="dropdown-item border-bottom" href="#">
						<h4>Shopping Cart</h4>
					</a>
					<div style={{ maxHeight: "500px", overflowY: "scroll" }}>

						<div className='media p-2 border-bottom'>
							<div className='media-left thumbnail'>
								<Link to='/video-charts'>
									<img src=''
										width="160em" height="90em" />
								</Link>
							</div>
							<div className='media-body ml-2'>
								<h6 className="m-0"
									style={{ width: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}></h6>
								<h6 style={{ width: "140px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
									<small></small>
								</h6>
								<h6 style={{ color: "green" }}>KES 20</h6>
							</div>
						</div>
						<Link className="dropdown-item p-2" to="/cart">
							<center>
								<h6>Checkout</h6>
							</center>
						</Link>
					</div>
				</div>
			</div>
			{/* Notification Dropdown */}
			<div className="dropdown mr-2">
				<a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">
					<svg className="bi bi-bell" width="1em" height="1em" viewBox="0 0 16 16"
						fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
						<path fillRule="evenodd"
							d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
					</svg>
				</a>
				<span className="badge badge-danger rounded-circle hidden"
					style={{ padding: "3px 5px", position: "absolute", right: "-3px", top: "-3px", border: "solid #232323" }}>

				</span>
				<div style={{ borderRadius: "0" }} className="dropdown-menu dropdown-menu-right"
					aria-labelledby="dropdownMenuButton">
					<a className="dropdown-item border-bottom" href="#">
						<h4>Notifications</h4>
					</a>
					<div style={{ maxHeight: "500px", overflowY: "scroll" }}>

						<div className='border-bottom'>
							<a href='#' className="p-2">
								<h6></h6>
							</a>
						</div>
						<div className='p-2 border-bottom'>
							<a href='#'>
								<p>
									<small> just Decorated
                                                                you.</small>
								</p>
							</a>
						</div>
						<div className='p-2 border-bottom'>
							<a href='#'>
								<h6 style={{ color: "purple" }}>New Fans</h6>
							</a>
						</div>
						<div className='p-1 border-bottom'>
							<a href='#'>
								<p className="m-0">
									<small> became a
                                                                fan.</small>
								</p>
							</a>
						</div>
						<div className='p-1 border-bottom'>
							<a href='#'>
								<h6>Songs Bought</h6>
							</a>
						</div>
						<div className='p-1 border-bottom'>
							<a href='#'>
								<p className="m-0">
									<small> just bought</small>
								</p>
							</a>
						</div>
					</div>
				</div>
			</div>
			{/* Avatar Dropdown */}
			<div className="dropdown">
				<a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">
					<Img src={`/storage/${props.auth.pp}`}
						imgClass={"rounded-circle"} width="25px" height="25px" alt="Avatar" />
				</a>
				<div style={{ borderRadius: "0" }} className="dropdown-menu dropdown-menu-right m-0 p-0"
					aria-labelledby="dropdownMenuButton">
					<Link to={`/profile/${props.auth.username}`}
						className="p-3 dropdown-item border-bottom">
						<h5>{props.auth.name}</h5>
						<h6>{props.auth.username}</h6>
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
