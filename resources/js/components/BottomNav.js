import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Bottomnav = (props) => {

	const location = useLocation()

	var checkLocation = true

	if (props.show != 0) {
		checkLocation = location.pathname.match(/audio-show/)
	}

	// Get number of items in video cart
	const vidCartItems = props.cartVideos.filter((cartVideo) => cartVideo.username == props.auth.username).length
	const audCartItems = props.cartAudios.filter((cartAudio) => cartAudio.username == props.auth.username).length
	const cartItems = vidCartItems + audCartItems

	return (
		<>
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
					style={{ height: "3px", background: "#232323", borderRadius: "0px", display: checkLocation && "none" }}>
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
				<div className="container-fluid menu-area d-flex text-white hidden">

					<div style={{ display: checkLocation && "none" }}>
						{/* <!-- Close Icon --> */}
						<span onClick={() => props.setShow(0)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x"
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
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip",
									color: "white"
								}}>
								{props.audios.find((audio) => audio.id == props.show) &&
									props.audios.find((audio) => audio.id == props.show).name}
							</h6>
							<h6 className="mt-0 pt-0" style={{ color: "white" }}>
								<small>
									{props.audios.find((audio) => audio.id == props.show) &&
										props.audios.find((audio) => audio.id == props.show).username}
								</small>
								<small className="ml-1">
									{props.audios.find((audio) => audio.id == props.show) &&
										props.audios.find((audio) => audio.id == props.show).ft}
								</small>
							</h6>
						</Link>
					</div>
					<div style={{ cursor: "pointer", display: checkLocation && "none" }} className="p-2">
						<span onClick={props.prevSong}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-skip-backward"
								viewBox="0 0 16 16">
								<path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
							</svg>
						</span>
					</div>
					<div style={{ cursor: "pointer", display: checkLocation && "none", color: "#FFD700" }} className="p-2">
						<span
							onClick={props.playBtn ? props.pauseSong : props.playSong}>
							{props.playBtn ?
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="2em"
									height="2em"
									fill="currentColor"
									className="bi bi-pause"
									viewBox="0 0 16 16">
									<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
								</svg> :
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="2em"
									height="2em"
									fill="currentColor"
									className="bi bi-play"
									viewBox="0 0 16 16">
									<path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
								</svg>
							}
						</span>
					</div>
					<div style={{ cursor: "pointer", display: checkLocation && "none" }} className="p-2">
						<span onClick={props.nextSong}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-skip-forward"
								viewBox="0 0 16 16">
								<path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
							</svg>
						</span>
					</div>
				</div>
				{/* Audio Player End */}

				{/* Bottom Nav */}
				<div className="anti-hidden">
					<div className="container-fluid menu-area d-flex justify-content-between">
						{/* Home */}
						<Link
							to="/"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
								color: location.pathname == "/" ? "gold" : "white"
							}}>
							<span style={{ fontSize: "20px", margin: "0" }} className="nav-link">
								<svg className="bi bi-house" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
									<path fillRule="evenodd"
										d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
								</svg>
							</span>
						</Link>
						{/* Home End */}
						{/* Discover */}
						<Link
							to="/video-charts"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
								color: location.pathname == "/video-charts" || location.pathname == "/audio-charts" ? "gold" : "white"
							}}>
							<span style={{ fontSize: "20px" }} className="nav-link">
								<svg className="bi bi-compass" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M8 15.016a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zm0 1a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" />
									<path
										d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1zm.94 6.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z" />
								</svg>
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
								color: location.pathname == "/search" ? "gold" : "white"
							}}
							onClick={props.onSearchIconClick}>
							<span style={{ fontSize: "20px" }} className="nav-link">
								<svg className="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
									<path fillRule="evenodd"
										d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
								</svg>
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
								color: location.pathname == "/cart" ? "gold" : "white"
							}}>
								<span style={{ fontSize: "20px" }} className="nav-link">
									<svg className="bi bi-cart3" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
										xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd"
											d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
									</svg>
								</span>
								<span className="badge badge-danger rounded-circle"
									style={{
										fontSize: "12px",
										fontWeight: "100",
										position: "absolute",
										right: "0.5rem",
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
								fontWeight: "100",
								color: location.pathname == "/library" ? "gold" : "white"
							}}>
							<span style={{ fontSize: "20px" }} className="nav-link">
								<svg className="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
								</svg>
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
