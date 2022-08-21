import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Ticker from 'react-ticker'

import Img from '../components/Img'
import KaraokeCommentSection from './KaraokeCommentSection'

import CloseSVG from '../svgs/CloseSVG'
import CommentSVG from '../svgs/CommentSVG'
import DecoSVG from '../svgs/DecoSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import HeartSVG from '../svgs/HeartSVG'
import BookmarkSVG from '../svgs/BookmarkSVG'
import BookmarkFilledSVG from '../svgs/BookmarkFilledSVG'
import ShareSVG from '../svgs/ShareSVG'
import MusicNoteSVG from '../svgs/MusicNoteSVG'
import PlayFilledSVG from '../svgs/PlayFilledSVG'
import axios from 'axios'

const Karaoke = (props) => {

	const [karaokeComments, setKaraokeComments] = useState([])
	const [play, setPlay] = useState()
	const [bottomMenu, setBottomMenu] = useState()

	// ID for video
	const video = useRef()

	// ID for Video Description
	const karaokeDescription = useRef()

	// ID for Video Description text
	const showDescription = useRef()

	// Id for rotating record
	const spiningRecord = useRef()

	useEffect(() => {

		// Fetch Karaoke Comments
		axios.get(`/api/karaoke-comments`)
			.then((res) => {
				setKaraokeComments(res.data)
			}).catch(() => props.setErrors(["Failed to fetch karaoke comments"]))
	}, [])

	// Function for liking karaoke
	const onKaraokeLike = (id) => {
		// Show like
		const newKaraokes = props.karaokes
			.filter((item) => {
				// Get the exact karaoke and change like status
				if (item.id == props.karaoke.id) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new karaokes
		props.setKaraokes(newKaraokes)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/karaoke-likes`, {
				karaoke: id
			}).then((res) => {
				props.setMessages([res.data])
				// Update karaoke
				axios.get(`${props.url}/api/karaokes`)
					.then((res) => props.setKaraokes(res.data))
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

	// Function for saving Karaokes
	const saveKaraoke = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post('api/saved-karaokes', {
				id: props.karaoke.id
			}).then((res) => {
				props.setMessages([res.data])
				// Update karaoke
				axios.get(`${props.url}/api/karaokes`)
					.then((res) => props.setKaraokes(res.data))
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

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: props.karaoke.audio,
			text: `Check out this karaoke on Black Music\n`,
			url: `https://music.black.co.ke/#/karaoke-show/${props.karaoke.id}`
		}
		// Check if data is shareble
		navigator.canShare(shareData) &&
			navigator.share(shareData)
	}

	// Pause or Play Video
	const onPause = () => {
		video.current.pause()
		// Stop Spining Record
		spiningRecord.current.style.animationPlayState = "paused"
		setPlay(true)
	}

	const onPlay = () => {
		video.current.play()
		// Start Spining Record
		spiningRecord.current.style.animationPlayState = "running"
		setPlay(false)
	}

	// Show More
	const showMore = () => {
		var d = karaokeDescription.current.style.display
		karaokeDescription.current.style.display = d == "none" ? "block" : "none"

		var t = showDescription.current.innerHTML
		showDescription.current.innerHTML = t == "show more" ? "show less" : "show more"
	}

	return (
		<div
			id={props.karaoke.id}
			className="single-karaoke">
			<video
				ref={video}
				src={`/storage/${props.karaoke.karaoke}`}
				className="karaoke-player"
				width="100%"
				loading="lazy"
				preload="none"
				muted
				autoPlay
				loop
				playsInline
				onClick={play ? onPlay : onPause}>
			</video>
			{/* Floating Video Info Top */}
			<div
				style={{ position: "absolute", top: 0 }}>
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
				{/* Floating Video Info Middle */}
				<div
					className="d-flex justify-content-center"
					onClick={play ? onPlay : onPause}>
					{/* Pause Icon */}
					<div
						className="p-2"
						style={{ fontSize: "4em", color: "rgba(220, 220, 220, 1)" }}>
						{play && <PlayFilledSVG />}
					</div>
				</div>
				{/* Floating Video Info Middle End */}
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
							<b>{props.karaoke.name}</b>
							<small>{props.karaoke.username}</small>
							<span className="ml-1" style={{ color: "gold" }}>
								<DecoSVG />
								<small className="ml-1" style={{ color: "inherit" }}>{props.karaoke.decos}</small>
							</span>
							<small><b><i className="text-secondary d-block">{props.karaoke.created_at}</i></b></small>
						</div>
						{/* Description */}
						<p
							ref={karaokeDescription}
							className="m-0 mx-1 p-0"
							style={{ display: "none" }}>
							{props.karaoke.description}
						</p>
						{/* Show More */}
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
						{/* Audio Name */}
						<div className="d-flex py-2">
							<div
								className="mr-2"
								style={{ fontSize: "1.5em", color: "#FFD700" }}>
								<MusicNoteSVG />
							</div>
							<div className="flex-grow-1 align-self-center">
								<Ticker mode="smooth">
									{({ index }) => (
										<span style={{ color: "#FFD700" }}>
											{props.karaoke.audio_name}
										</span>
									)}
								</Ticker>
							</div>
						</div>
					</div>
					<div className="p-2 align-self-end">
						{/* Vertical Content */}
						<div className="d-flex flex-column mb-2">
							{/* Avatar */}
							<div className="avatar-thumbnail-xs mb-3" style={{ borderRadius: "50%" }}>
								<center>
									<Link to={`/profile/${props.karaoke.username}`}>
										<Img
											src={`/storage/${props.karaoke.pp}`}
											width="50px"
											height="50px"
											alt={'avatar'} />
									</Link>
								</center>
							</div>
							{/* Karaoke Likes  */}
							<div>
								<center>
									{props.karaoke.hasLiked ?
										<a href="#"
											style={{ color: "#fb3958" }}
											onClick={(e) => {
												e.preventDefault()
												onKaraokeLike(props.karaoke.id)
											}}>
											<span
												className="p-0"
												style={{ color: "inherit", fontSize: "2em" }}>
												<HeartFilledSVG />
											</span>
											<h6 className="mb-2" style={{ color: "inherit" }}>{props.karaoke.likes}</h6>
										</a> :
										<a
											href="#"
											style={{ color: "rgba(220, 220, 220, 1)" }}
											onClick={(e) => {
												e.preventDefault()
												onKaraokeLike(props.karaoke.id)
											}}>
											<span
												className="p-0"
												style={{ color: "inherit", fontSize: "2em" }}>
												<HeartSVG />
											</span>
											<h6 className="mb-2" style={{ color: "inherit" }}>{props.karaoke.likes}</h6>
										</a>}
								</center>
							</div>
							{/* Karaoke Comments */}
							<div style={{ color: "rgba(220, 220, 220, 1)" }}>
								<center>
									<span
										className="p-0"
										style={{ fontSize: "2em" }}
										onClick={() => setBottomMenu("menu-open")}>
										<CommentSVG />
									</span>
									<h6 className="mb-2" style={{ color: "inherit" }}>{props.karaoke.comments}</h6>
								</center>
							</div>
							{/* Save  */}
							{/* Save Karaoke */}
							<div>
								<center>
									{props.karaoke.hasSaved ?
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault()
												saveKaraoke()
											}}>
											<span
												className="mb-2 p-0"
												style={{ fontSize: "2em", color: "#FFD700" }}>
												<BookmarkFilledSVG />
											</span>
										</a> :
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault()
												saveKaraoke()
											}}>
											<span
												className="mb-2 p-0"
												style={{ fontSize: "2em", color: "rgba(220, 220, 220, 1)" }}>
												<BookmarkSVG />
											</span>
										</a>}
								</center>
							</div>
							{/* Share Karaoke */}
							<div>
								<center>
									<span
										className="mb-3 p-0"
										style={{ fontSize: "2em", color: "rgba(220, 220, 220, 1)" }}
										onClick={onShare}>
										<ShareSVG />
									</span>
								</center>
							</div>
							{/* Current Audio */}
							<div>
								<center>
									<div ref={spiningRecord} className="rotate-record">
										<Link 
											to={`/audio-show/${props.karaoke.audio_id}`}
											onClick={() => {
												props.setShow(props.karaoke.audio_id)
												props.setLocalStorage("show", {
													"id": props.karaoke.audio_id,
													"time": 0
												})
											}}>
											<Img
												src={`/storage/${props.karaoke.audio_thumbnail}`}
												imgClass="rounded-circle"
												width="50px"
												height="50px"
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

			<KaraokeCommentSection
				{...props}
				karaokeComments={karaokeComments}
				setKaraokeComments={setKaraokeComments}
				bottomMenu={bottomMenu}
				setBottomMenu={setBottomMenu}
				id={props.karaoke.id} />
		</div>
	)
}

export default Karaoke