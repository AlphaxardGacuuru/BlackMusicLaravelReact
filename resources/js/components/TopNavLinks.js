import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Img from "./Img"

import PersonSVG from '../svgs/PersonSVG'
import CartSVG from '../svgs/CartSVG'
import BellSVG from '../svgs/BellSVG'
import LogoutSVG from '../svgs/LogoutSVG'
import DownloadSVG from '../svgs/DownloadSVG'
import PrivacySVG from '../svgs/PrivacySVG'
import SettingsSVG from '../svgs/SettingsSVG'
import StudioSVG from '../svgs/StudioSVG'

const TopNavLinks = (props) => {
	
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
					{props.cartItems > 0 && props.cartItems}
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
					onClick={props.onNotification}>
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
						props.setBottomMenu("menu-open")
						props.setNotificationVisibility("block")
						props.setAvatarVisibility("none")
						props.onNotification()
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
					{props.notifications.filter((notification) => !notification.isRead).length > 0 &&
						props.notifications.filter((notification) => !notification.isRead).length}
				</span>
				<div
					style={{ borderRadius: "0", backgroundColor: "#232323" }}
					className="dropdown-menu dropdown-menu-right m-0 p-0"
					aria-labelledby="dropdownMenuButton">
					<div className="dropdown-header border-bottom border-dark">Notifications</div>
					<div style={{ maxHeight: "500px", overflowY: "scroll" }}>
						{/* Get Notifications */}
						{props.notifications
							.map((notification, key) => (
								<Link
									key={key}
									to={notification.url}
									className="p-2 dropdown-item border-bottom text-dark border-dark"
								// onClick={() => props.onDeleteNotifications(notification.id)}
								>
									<small>{notification.message}</small>
								</Link>
							))}
					</div>
					{props.notifications.length > 0 &&
						<div
							className="dropdown-header"
							style={{ cursor: "pointer" }}
							onClick={() => props.onDeleteNotifications(0)}>
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
						props.setBottomMenu("menu-open")
						props.setAvatarVisibility("block")
						props.setNotificationVisibility("none")
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
						to="/download-app"
						className="p-3 dropdown-item border-bottom border-dark"
						style={{ display: props.downloadLink ? "block" : "none" }}>
						<h6><span className="mr-2"><DownloadSVG /></span>Get App</h6>
					</Link>
					<Link to='/videos' className="p-3 dropdown-item border-bottom border-dark">
						<h6><span className="mr-2"><StudioSVG /></span>Studio</h6>
					</Link>
					<Link to='/settings' className="p-3 dropdown-item border-bottom border-dark">
						<h6><span className="mr-2"><SettingsSVG /></span>Settings</h6>
					</Link>
					<Link
						to="/privacy-policy"
						className="p-3 dropdown-item border-bottom border-dark"
						title="Privacy Policy">
						<h6><span className="mr-2"><PrivacySVG /></span>Privacy Policy</h6>
					</Link>
					<Link
						to="#"
						className="p-3 dropdown-item"
						onClick={props.logout}>
						<h6><span className="mr-2"><LogoutSVG /></span>Logout</h6>
					</Link>
				</div>
			</div>
			{/* Avatar Dropdown End */}
		</>
	)
}

export default TopNavLinks
