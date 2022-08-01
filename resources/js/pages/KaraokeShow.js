import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

import Img from '../components/Img'

import CloseSVG from '../svgs/CloseSVG'
import CommentSVG from '../svgs/CommentSVG'
import DecoSVG from '../svgs/DecoSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import HeartSVG from '../svgs/HeartSVG'
import ShareSVG from '../svgs/ShareSVG'
import MusicNoteSVG from '../svgs/MusicNoteSVG'

const KaraokeShow = (props) => {

	const { id } = useParams()

	const [karaoke, setKaraoke] = useState([])
	const [karaokeComments, setKaraokeComments] = useState([{ "text": "Hey, nice!" }, { "text": "Hey, what's up?" }])
	const [bottomMenu, setBottomMenu] = useState()

	// ID for Video Description
	const karaokeDescription = useRef()

	// ID for Video Description text
	const showDescription = useRef()

	useEffect(() => {
		// Fetch Karaoke
		axios.get(`/api/karaokes/${id}`)
			.then((res) => {
				setKaraoke(res.data)
				// props.setLocalStorage("videos", res.data)
			}).catch(() => props.setErrors(["Failed to fetch karaoke"]))

		// Fetch Karaoke Comments
		axios.get(`/api/karaoke-comments/${id}`)
			.then((res) => {
				// setKaraokeComments(res.data)
				// props.setLocalStorage("videos", res.data)
			}).catch(() => props.setErrors(["Failed to fetch karaoke comments"]))
	}, [])

	// Show More
	const showMore = () => {
		var d = karaokeDescription.current.style.display
		karaokeDescription.current.style.display = d == "none" ? "block" : "none"

		var t = showDescription.current.innerHTML
		showDescription.current.innerHTML = t == "show more" ? "show less" : "show more"
	}

	// Function for liking karaoke
	const onKaraokeLike = (id) => {
		// Show like
		const newKaraoke = {...karaoke, "hasLiked": !karaoke.hasLiked}

		// Set new karaokes
		setKaraoke(newKaraoke)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/karaoke-likes`, {
				karaoke: id
			}).then((res) => {
				props.setMessages([res.data])
				// Update karaoke
				axios.get(`${props.url}/api/karaokes/${id}`)
					.then((res) => setKaraoke(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		})
	}

	return (
		<>
			<div className="row p-0">
				<div className="col-sm-4"></div>
				<div
					className="col-sm-4"
					style={{
						width: window.innerWidth,
						height: window.innerHeight,
						overflow: "hidden"
					}}>
					<video
						src={`/storage/${karaoke.karaoke}`}
						width="100%"
						loading="lazy"
						preload="none"
						autoPlay
						muted
						loop
						playsInline>
					</video>
					{/* Floating Video Info Top */}
					<div style={{ position: "absolute", top: 0 }}>
						<div className="d-flex">
							{/* Close Icon */}
							<div className="p-2">
								<Link to="/karaoke-charts" style={{ fontSize: "1.5em" }}>
									<CloseSVG />
								</Link>
							</div>
						</div>
					</div>
					{/* Floating Video Info Top End */}
					{/* Floating Video Info Bottom */}
					<div className="karaoke-overlay w-100">
						{/* Horizontal Content */}
						<div className="d-flex">
							<div className="p-1 flex-grow-1 align-self-end">
								<div className="m-1"
									style={{
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									<b>{karaoke.name}</b>
									<small>{karaoke.username}</small>
									<span className="ml-1" style={{ color: "gold" }}>
										<DecoSVG />
										<small className="ml-1" style={{ color: "inherit" }}>{karaoke.decos}</small>
									</span>
									<small><b><i className="text-secondary d-block">{karaoke.created_at}</i></b></small>
								</div>
								<p
									ref={karaokeDescription}
									className="m-0 mx-1 p-0"
									style={{ display: "none" }}>
									{karaoke.description}
								</p>
								<small>
									<b>
										<i
											ref={showDescription}
											className="text-secondary ml-1"
											onClick={showMore}>
											show more
										</i>
									</b>
								</small>
								<h6
									style={{
										width: "20em",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip",
										color: "#FFD700"
									}}>
									<span
										className="mr-2"
										style={{ fontSize: "1.5em", color: "inherit" }}>
										<MusicNoteSVG />
									</span>
									{karaoke.audio}
								</h6>
							</div>
							<div className="p-2 align-self-end">
								{/* Vertical Content */}
								<div className="d-flex flex-column mb-2">
									{/* Avatar */}
									<div className="avatar-thumbnail-xs ml-auto mr-1 mb-3" style={{ borderRadius: "50%" }}>
										<center>
											<Link to={`/profile/${karaoke.karaokename}`}>
												<Img
													src={`/storage/${karaoke.pp}`}
													width="50px"
													height="50px"
													alt={'avatar'} />
											</Link>
										</center>
									</div>
									{/* Karaoke Likes  */}
									<div className="ml-auto mr-3">
										<center>
											{karaoke.hasLiked ?
												<a href="#"
													style={{ color: "#fb3958" }}
													onClick={(e) => {
														e.preventDefault()
														onKaraokeLike(karaoke.id)
													}}>
													<span style={{ color: "inherit", fontSize: "2em" }}><HeartFilledSVG /></span>
													<h6 style={{ color: "inherit" }}>{karaoke.likes}</h6>
												</a> :
												<a
													href="#"
													style={{ color: "rgba(220, 220, 220, 1)" }}
													onClick={(e) => {
														e.preventDefault()
														onKaraokeLike(karaoke.id)
													}}>
													<span style={{ color: "inherit", fontSize: "2em" }}><HeartSVG /></span>
													<h6 style={{ color: "inherit" }}>{karaoke.likes}</h6>
												</a>}
										</center>
									</div>
									{/* Karaoke Comments */}
									<div className="ml-auto mr-3" style={{ color: "rgba(220, 220, 220, 1)" }}>
										<center>
											<span style={{ fontSize: "2em" }}
												onClick={() => setBottomMenu("menu-open")}>
												<CommentSVG />
											</span>
											<h6 style={{ color: "inherit" }}>{karaoke.comments}</h6>
										</center>
									</div>
									{/* Share Karaoke */}
									<div className="ml-auto mr-3 mb-3">
										<center>
											<span
												style={{ fontSize: "2em", color: "rgba(220, 220, 220, 1)" }}
											// onClick={() => setBottomMenu("menu-open")}
											>
												<ShareSVG />
											</span>
										</center>
									</div>
									{/* Current Audio */}
									<div className="ml-auto mr-1">
										<center>
											<div className="rotate-record">
												<Link to={`/audio-show/${karaoke.audio_id}`}>
													<Img
														width="50px"
														height="50px"
														style={{ animation: "rotation 2s infinite linear" }}
														alt="current audio" />
												</Link>
											</div>
										</center>
									</div>
								</div>
								{/* Vertical Content End */}
							</div>
						</div>
						{/* Horizontal Content End */}
					</div>
					{/* Floating Video Info Bottom End */}
				</div>
				<div className="col-sm-4"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						<div className="dropdown-header text-white">
							<h5 style={{ margin: "0px" }}>Comments</h5>
						</div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "1em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Karaoke Comments */}
					<div className="m-0 p-0">
						<div style={{ maxHeight: window.innerHeight * 0.75, overflowY: "scroll" }}>
							{/* Get Notifications */}
							{karaokeComments
								.map((karaokeComment, key) => (
									<p
										key={key}
										className="text-light p-2"
										style={{ display: "block", textAlign: "left" }}>
										{karaokeComment.text}
									</p>
								))}
						</div>
					</div>
					{/* Karaoke Comments End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</>
	)
}

export default KaraokeShow