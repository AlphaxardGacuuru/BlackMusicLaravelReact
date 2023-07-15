import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

// import SocialMediaInput from './SocialMediaInput'

import CloseSVG from "@/svgs/CloseSVG"
import PreviousSVG from "@/svgs/PreviousSVG"
import PauseSVG from "@/svgs/PauseSVG"
import PlaySVG from "@/svgs/PlaySVG"
import NextSVG from "@/svgs/NextSVG"
import HomeSVG from "@/svgs/HomeSVG"
import DiscoverSVG from "@/svgs/DiscoverSVG"
import SearchSVG from "@/svgs/SearchSVG"
import CartSVG from "@/svgs/CartSVG"
import PersonSVG from "@/svgs/PersonSVG"

const Bottomnav = (props) => {
	const location = useLocation()

	var display
	var hidePlayer = true
	var isInKaraoke = false

	// Hide BottomNav from various pages
	location.pathname.match("/404") ||
	location.pathname == "/story/[id]" ||
	location.pathname.match("/story/create") ||
	location.pathname == "/karaoke/[id]" ||
	location.pathname.match("/karaoke/create") ||
	location.pathname.match("/privacy-policy") ||
	location.pathname.match("/download-app") ||
	location.pathname.match("/chat/") ||
	location.pathname == "/post/edit/[id]" ||
	location.pathname.match("/post/create") ||
	location.pathname == "/post/[id]" ||
	location.pathname.match("/referral") ||
	location.pathname.match("/login") ||
	location.pathname.match("/register")
		? (display = "none")
		: (display = "")

	// Check if audio is in queue and location is in audio show
	if (props.audioStates.show.id != 0 && props.audioStates.show != "") {
		hidePlayer = location.pathname == "/audio/[id]"
	}

	// Check if location is in Karaoke
	isInKaraoke =
		location.pathname == "/karaoke/[id]" ||
		location.pathname.match("/karaoke-create")

	// Get number of items in video cart
	const vidCartItems = props.cartVideos.length
	const audCartItems = props.cartAudios.length
	const cartItems = vidCartItems + audCartItems

	return (
		<>
			{/* Add breaks if audio player is visible */}
			<br style={{ display: props.audioStates.hidePlayer && "none" }} />
			<br style={{ display: props.audioStates.hidePlayer && "none" }} />
			<br style={{ display: props.audioStates.hidePlayer && "none" }} />
			<br style={{ display: isInKaraoke && "none" }} className="anti-hidden" />
			<br style={{ display: isInKaraoke && "none" }} className="anti-hidden" />

			<div className="bottomNav menu-content-area header-social-area">
				{/* <!-- Progress Container --> */}
				<div
					className="border-bottom border-dark"
					style={{ display: hidePlayer && "none" }}>
					<div
						ref={props.audioStates.audioContainer}
						className="progress"
						style={{
							height: "3px",
							background: "#232323",
							borderRadius: "0px",
						}}>
						<div
							ref={props.audioStates.audioProgress}
							className="progress-bar rounded-0"
							style={{
								background: "#FFD700",
								height: "5px",
								width: props.audioStates.progressPercent,
							}}></div>
					</div>

					{/* Audio Player */}
					<div className="container-fluid menu-area d-flex text-white hidden px-1 border-bottom border-dark">
						{/* <!-- Close Icon --> */}
						<div className="px-0 align-self-center">
							<span
								onClick={() => {
									props.audioStates.pauseSong()
									props.setLocalStorage("show", {
										id: 0,
										time: 0,
									})
									props.audioStates.setShow({
										id: 0,
										time: 0,
									})
								}}>
								<CloseSVG />
							</span>
						</div>
						{/* Audio Details */}
						<div className="p-2 me-auto align-self-center flex-grow-1">
							<Link to={`/audio/${props.audioStates.show.id}`}>
								<h6 className="mb-0 pb-0 text-white audio-text">
									{props.audioStates.audio?.name}
								</h6>
								<h6 className="my-0 pt-0 text-white">
									<small>{props.audioStates.audio?.username}</small>
									<small className="ms-1">{props.audioStates.audio?.ft}</small>
								</h6>
							</Link>
						</div>
						{/* Loader */}
						{props.audioStates.audioLoader && (
							<div className="align-self-center" style={{ padding: "10px" }}>
								<div
									className="spinner-border text-light"
									style={{
										borderTopWidth: "2px",
										borderBottomWidth: "2px",
										borderLeftWidth: "2px",
										width: "20px",
										height: "20px",
									}}></div>
							</div>
						)}
						{/* Previous */}
						<div
							style={{ cursor: "pointer" }}
							className="p-2 align-self-center">
							<span onClick={props.audioStates.prevSong}>
								<PreviousSVG />
							</span>
						</div>
						{/* Play / Pause */}
						<div
							style={{
								cursor: "pointer",
								color: "#FFD700",
							}}
							className="p-1 align-self-center">
							<span
								style={{ fontSize: "2em" }}
								onClick={
									props.audioStates.playBtn
										? props.audioStates.pauseSong
										: props.audioStates.playSong
								}>
								{props.audioStates.playBtn ? <PauseSVG /> : <PlaySVG />}
							</span>
						</div>
						{/* Next */}
						<div
							style={{ cursor: "pointer" }}
							className="p-2 align-self-center">
							<span onClick={props.audioStates.nextSong}>
								<NextSVG />
							</span>
						</div>
					</div>
				</div>
				{/* Audio Player End */}

				{/* Bottom Nav */}
				<div className="anti-hidden" style={{ display: display }}>
					<div className="container-fluid menu-area d-flex justify-content-between p-2 px-4">
						{/* Home */}
						<Link
							to="/"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
							}}>
							<span
								style={{
									fontSize: "20px",
									margin: "0",
									color: location.pathname == "/" ? "gold" : "white",
								}}
								className="nav-link">
								<HomeSVG />
							</span>
						</Link>
						{/* Home End */}
						{/* Discover */}
						<Link
							to="/karaoke/charts"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
							}}>
							<span
								style={{
									fontSize: "20px",
									color:
										location.pathname == "/karaoke/charts" ||
										location.pathname == "/video/charts" ||
										location.pathname == "/audio/charts"
											? "gold"
											: "white",
								}}
								className="nav-link">
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
								fontWeight: "100",
							}}
							onClick={props.onSearchIconClick}>
							<span
								style={{
									fontSize: "20px",
									color: location.pathname == "/search" ? "gold" : "white",
								}}
								className="nav-link">
								<SearchSVG />
							</span>
						</Link>
						{/* Search End */}
						{/* Cart */}
						<Link
							to="/cart"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
								position: "relative",
							}}>
							<span
								style={{
									fontSize: "20px",
									color: location.pathname == "/cart" ? "gold" : "white",
								}}
								className="nav-link">
								<CartSVG />
								<span
									className="position-absolute start-200 translate-middle badge rounded-circle bg-danger fw-lighter py-1"
									style={{
										fontSize: "0.6em",
										top: "0.6em",
									}}>
									{cartItems > 0 && cartItems}
								</span>
							</span>
						</Link>
						{/* Cart End */}
						{/* Library */}
						<Link
							to="/library"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
							}}>
							<span
								style={{
									fontSize: "23px",
									color: location.pathname == "/library" ? "gold" : "white",
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
