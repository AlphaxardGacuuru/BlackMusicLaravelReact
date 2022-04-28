import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import SocialMediaInput from './SocialMediaInput'

import PreviousSVG from '../svgs/PreviousSVG';
import PauseSVG from '../svgs/PauseSVG';
import PlaySVG from '../svgs/PlaySVG';
import NextSVG from '../svgs/NextSVG';
import HomeSVG from '../svgs/HomeSVG';
import DiscoverSVG from '../svgs/DiscoverSVG';
import SearchSVG from '../svgs/SearchSVG';
import CartSVG from '../svgs/CartSVG';
import PersonSVG from '../svgs/PersonSVG';

const Bottomnav = (props) => {

	const location = useLocation()

	var display
	var inputDisplay
	var checkLocation = true

	// Hide BottomNav from various pages
	location.pathname.match("/download-app") ||
		location.pathname.match("/chat/") ||
		location.pathname.match("/post-edit") ||
		location.pathname.match("/post-create") ||
		location.pathname.match("/post-show/") ||
		location.pathname.match("/referral") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register") ?
		display = "none" : display = ""

	// Show Social Input in various pages
	location.pathname.match("/post-show/") ||
		location.pathname.match("/chat/") ?
		inputDisplay = "" : inputDisplay = "none"

	if (props.show != 0) {
		checkLocation = location.pathname.match(/audio-show/)
	}

	// Get number of items in video cart
	const vidCartItems = props.cartVideos.filter((cartVideo) => cartVideo.username == props.auth.username).length
	const audCartItems = props.cartAudios.filter((cartAudio) => cartAudio.username == props.auth.username).length
	const cartItems = vidCartItems + audCartItems

	return (
		<>
			{/* Add breaks if social input is visible */}
			<br style={{ display: !props.showSocialInput && "none" }} />
			<br style={{ display: !props.showSocialInput && "none" }} />
			{/* Add breaks if audio player is visible */}
			<br style={{ display: checkLocation && "none" }} />
			<br style={{ display: checkLocation && "none" }} />
			<br style={{ display: checkLocation && "none" }} />
			<br className="anti-hidden" />
			<br className="anti-hidden" />
			{/* // <div className="col-sm-12 m-0 p-0"> */}
			<div className="bottomNav menu-content-area header-social-area">
				{/* <!-- Progress Container --> */}
				<div
					ref={props.audioContainer}
					className="progress"
					style={{
						height: "3px",
						background: "#232323",
						borderRadius: "0px",
						display: checkLocation && "none"
					}}>
					<div
						ref={props.audioProgress}
						className="progress-bar rounded-0"
						style={{
							background: "#FFD700",
							height: "5px",
							width: props.progressPercent
						}}>
					</div>
				</div>

				{/* Audio Player */}
				<div className="container-fluid menu-area d-flex text-white hidden px-1">
					<div style={{ display: checkLocation && "none" }}>
						{/* <!-- Close Icon --> */}
						<span onClick={() => {
							props.setShow(0)
							props.setLocalStorage("show", "")
						}}>
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
						</span>
					</div>
					<div className="p-2 mr-auto" style={{ display: checkLocation && "none" }} >
						<Link to={`/audio-show/${props.show}`}>
							<h6
								className="mb-0 pb-0"
								style={{
									maxWidth: "14em",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip",
									color: "white"
								}}>
								{props.showAudio.name}
							</h6>
							<h6 className="mt-0 pt-0" style={{ color: "white" }}>
								<small>{props.showAudio.username}</small>
								<small className="ml-1">{props.showAudio.ft}</small>
							</h6>
						</Link>
					</div>
					{props.audioLoader &&
						<div className="p-2" style={{ display: checkLocation && "none" }}>
							<div className="spinner-border text-light"
								style={{
									borderTopWidth: "2px",
									borderBottomWidth: "2px",
									borderLeftWidth: "2px",
									width: "20px",
									height: "20px",
								}}>
							</div>
						</div>}
					<div
						style={{
							cursor: "pointer",
							display: checkLocation && "none"
						}}
						className="p-2">
						<span onClick={props.prevSong}><PreviousSVG /></span>
					</div>
					<div
						style={{
							cursor: "pointer",
							display: checkLocation && "none",
							color: "#FFD700"
						}}
						className="p-2">
						<span
							onClick={props.playBtn ? props.pauseSong : props.playSong}>
							{props.playBtn ? <PauseSVG /> : <PlaySVG />}
						</span>
					</div>
					<div
						style={{
							cursor: "pointer",
							display: checkLocation && "none"
						}}
						className="p-2">
						<span onClick={props.nextSong}><NextSVG /></span>
					</div>
				</div>
				{/* Audio Player End */}

				{/* Social Input */}
				<form
					onSubmit={props.onSubmit}
					className="contact-form bg-white"
					style={{ display: inputDisplay }}
					autoComplete="off">
					<SocialMediaInput {...props} />
				</form>

				{/* Bottom Nav */}
				<div className="anti-hidden" style={{ display: display }}>
					<div className="container-fluid menu-area d-flex justify-content-between">
						{/* Home */}
						<Link
							to="/"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100"
							}}>
							<span
								style={{
									fontSize: "20px",
									margin: "0",
									color: location.pathname == "/" ? "gold" : "white"
								}}
								className="nav-link">
								<HomeSVG />
							</span>
						</Link>
						{/* Home End */}
						{/* Discover */}
						<Link
							to="/video-charts"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100"
							}}>
							<span
								style={{
									fontSize: "20px",
									color: location.pathname == "/video-charts" ||
										location.pathname == "/audio-charts" ?
										"gold" : "white"
								}} className="nav-link">
								<DiscoverSVG />
							</span>
						</Link>
						{/* Discover End */}
						{/* Search */}
						<Link
							to="/search"
							style={{
								color: "white",
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100"
							}}
							onClick={props.onSearchIconClick}>
							<span
								style={{
									fontSize: "20px",
									color: location.pathname == "/search" ? "gold" : "white"
								}} className="nav-link">
								<SearchSVG />
							</span>
						</Link>
						{/* Search End */}
						{/* Cart */}
						<Link to="/cart"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
								position: "relative"
							}}>
							<span
								style={{
									fontSize: "20px",
									color: location.pathname == "/cart" ? "gold" : "white"
								}} className="nav-link">
								<CartSVG />
							</span>
							<span className="badge badge-danger rounded-circle"
								style={{
									fontSize: "12px",
									fontWeight: "100",
									position: "absolute",
									right: "-0.3rem",
									bottom: "1rem",
									border: "solid #232323"
								}}>
								{cartItems > 0 && cartItems}
							</span>
						</Link>
						{/* Cart End */}
						{/* Library */}
						<Link
							to="/library"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100"
							}}>
							<span
								style={{
									fontSize: "23px",
									color: location.pathname == "/library" ? "gold" : "white"
								}}
								className="nav-link">
								<PersonSVG />
							</span>
						</Link>
						{/* Library End */}
					</div>
				</div>
				{/* Bottom Nav End */}
			</div>
		</>
	)
}

export default Bottomnav
