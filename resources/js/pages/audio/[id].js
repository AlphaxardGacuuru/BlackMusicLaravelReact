import React, { useState, useEffect, Suspense } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
// import Axios from "axios"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"
import LoadingAudioMedia from "@/components/Audio/LoadingAudioMedia"
import CommentMedia from "@/components/Core/CommentMedia"
import AudioMedia from "@/components/Audio/AudioMedia"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import ShuffleSVG from "@/svgs/ShuffleSVG"
import PreviousSVG from "@/svgs/PreviousSVG"
import PauseSVG from "@/svgs/PauseSVG"
import PlaySVG from "@/svgs/PlaySVG"
import NextSVG from "@/svgs/NextSVG"
import LoopSVG from "@/svgs/LoopSVG"
import VolumeSVG from "@/svgs/VolumeSVG"
import ShareSVG from "@/svgs/ShareSVG"
import CartSVG from "@/svgs/CartSVG"
import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import DecoSVG from "@/svgs/DecoSVG"
import CheckSVG from "@/svgs/CheckSVG"

const AudioShow = (props) => {
	// let { referrer } = router.query
	const router = useHistory()

	let { id } = useParams()

	// Set State
	const [audio, setAudio] = useState(props.audio)
	const [audios, setAudios] = useState(props.audios)
	const [audioComments, setAudioComments] = useState(props.audioComments)
	const [boughtAudios, setBoughtAudios] = useState(
		props.getLocalStorage("boughtAudios")
	)
	const [inCart, setInCart] = useState(props.audio.inCart)
	const [hasLiked, setHasLiked] = useState(props.audio.hasLiked)
	const [hasFollowed, setHasFollowed] = useState(props.audio.hasFollowed)
	const [tabClass, setTabClass] = useState("comments")
	const [deletedIds, setDeletedIds] = useState([])

	// Fetch Audio Comments
	useEffect(() => {
		// Check if for to play is set to audio that belongs to this page
		if (props.audioStates.show.id != id) {
			props.audioStates.setShow({ id: id, time: 0 })
		}

		// setAudio(props.data.audio[0])

		if (id) {
			Axios.get(`/api/audios/${id}`)
				.then((res) => setAudio(res.data.data))
				.catch(() => props.setErrors([`Failed to fetch audio`]))

			props.get(`audio-comments/${id}`, setAudioComments)
		}

		// Fetch Audios
		props.get("audios", setAudios, "audios")
		// Fetch Bought Audios
		props.get("bought-audios", setBoughtAudios, "boughtAudios")
	}, [id])

	/*
	 * Function for liking audio */
	const onAudioLike = () => {
		// Show Like
		setHasLiked(!hasLiked)
		// Add like to database
		Axios.post(`/api/audio-likes`, { audio: id })
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Audio
				Axios.get(`api/audios/${id}`)
					.then((res) => setAudio(res.data.data))
					.catch((err) => props.getErrors(err))
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Buy function */
	const onBuyAudios = () => {
		onCartAudios()
		setTimeout(() => router.push("/cart"), 500)
	}

	/*
	 * Function for adding audio to cart */
	const onCartAudios = () => {
		// Show in cart
		setInCart(!inCart)
		// Add Audio to Cart
		Axios.post(`/api/cart-audios`, { audio: props.audio.id })
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err, true))
	}

	/*
	 * Function for downloading audio */
	const onDownload = () => {
		window.open(`${props.url}/api/audios/download/${audio.id}`)
		props.setMessages([`Downloading ${audio.name}`])
	}

	/*
	 * Function for following Musicans */
	const onFollow = () => {
		// Show follow
		setHasFollowed(!hasFollowed)

		// Add follow
		Axios.post(`/api/follows`, { musician: audio.username })
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err, true))
	}

	/*
	 * Function for liking comments */
	const onCommentLike = (comment) => {
		// Add like to database
		Axios.post(`/api/audio-comment-likes`, {
			comment: comment,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				props.get(`audio-comments/${id}`, setAudioComments)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for deleting comments */
	const onDeleteComment = (comment) => {
		// Remove deleted comment
		setDeletedIds([...deletedIds, comment])

		Axios.delete(`/api/audio-comments/${comment}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: audio.name,
			text: `Check out ${audio.name} on Black Music\n`,
			url: `https://music.black.co.ke/#/audio/${id}/${props.auth.username}`,
		}
		// Check if data is shareble
		navigator.canShare(shareData) && navigator.share(shareData)
	}

	// const onGuestBuy = () => {
	// 	props.setLogin(true)
	// 	sessionStorage.setItem("referrer", referrer)
	// 	sessionStorage.setItem("page", location.pathname)
	// }

	const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-7">
				{/* Audio Image */}
				<div
					className="ms-2 me-2"
					style={{
						overflow: "hidden",
						width: "auto",
						maxHeight: "495px",
					}}>
					<center>
						{props.audioLoader ? (
							<div id="sonar-load" className="mt-5 mb-5"></div>
						) : (
							<Img
								src={audio.thumbnail}
								width="100vw"
								height="100vh"
								alt="music-cover"
							/>
						)}
					</center>
				</div>

				{/* <!-- Progress Container --> */}
				<div
					ref={props.audioStates.audioContainer}
					className="progress ms-2 me-2 mt-4 bg-dark"
					style={{ height: "5px" }}
					onClick={props.audioStates.setProgress}>
					<div
						ref={props.audioStates.audioProgress}
						className="progress-bar"
						style={{
							background: "#FFD700",
							height: "5px",
							width: props.audioStates.progressPercent,
						}}></div>
				</div>
				{/* Progress Container End */}

				{/* Audio Controls */}
				<div
					className="d-flex justify-content-between"
					style={{ color: "rgba(220,220,220,1)" }}>
					{/* Timer */}
					<div style={{ cursor: "pointer" }} className="p-2 align-self-center">
						{props.audioStates.fmtMSS(props.audioStates.currentTime)}
					</div>
					{/* Shuffle Button */}
					<div
						style={{
							cursor: "pointer",
							color: props.audioStates.shuffle && "#FFD700",
						}}
						className="p-2 align-self-center"
						onClick={() => {
							props.audioStates.setShuffle(
								props.audioStates.shuffle ? false : true
							)
							props.audioStates.setLoop(props.audioStates.loop && false)
						}}>
						<ShuffleSVG />
					</div>
					{/* Previous Button */}
					<div style={{ cursor: "pointer" }} className="p-2 align-self-center">
						<span onClick={props.audioStates.prevSong}>
							<PreviousSVG />
						</span>
					</div>
					{/* Pause/Play Button */}
					<div
						style={{ cursor: "pointer", fontSize: "1.5em" }}
						className="p-2 align-self-center">
						<span
							onClick={
								props.audioStates.playBtn
									? props.audioStates.pauseSong
									: props.audioStates.playSong
							}>
							{props.audioStates.playBtn ? <PauseSVG /> : <PlaySVG />}
						</span>
					</div>
					{/* Next Button */}
					<div style={{ cursor: "pointer" }} className="p-2 align-self-center">
						<span onClick={props.audioStates.nextSong}>
							<NextSVG />
						</span>
					</div>
					{/* Loop Button */}
					<div
						style={{
							cursor: "pointer",
							color: props.audioStates.loop && "#FFD700",
						}}
						className="p-2 align-self-center"
						onClick={() => {
							props.audioStates.setLoop(props.audioStates.loop ? false : true)
							props.audioStates.setShuffle(props.audioStates.shuffle && false)
						}}>
						<LoopSVG />
					</div>
					<div style={{ cursor: "pointer" }} className="p-2 align-self-center">
						{props.audioStates.fmtMSS(props.audioStates.dur)}
					</div>
				</div>

				<div className="d-flex justify-content-end">
					{/* <!-- Volume Container --> */}
					<div
						style={{
							cursor: "pointer",
							color: "rgba(220,220,220,1)",
						}}
						className="volume-show">
						<VolumeSVG />
					</div>
					<div
						ref={props.audioStates.volumeContainer}
						className="progress volume-hide ms-2 me-2 mt-2 float-end bg-dark"
						style={{
							height: "5px",
							width: "25%",
						}}
						onClick={props.audioStates.onSetVolume}>
						<div
							ref={props.audioStates.volumeProgress}
							className="progress-bar"
							style={{
								background: "#FFD700",
								height: "5px",
								width: Math.round(props.audioStates.volume * 100),
							}}></div>
					</div>
				</div>
				{/* Audio Controls End */}

				{/* Audio Info Area */}
				<div className="d-flex justify-content-between">
					{/* Audio likes */}
					<div className="p-2 me-2">
						{hasLiked ? (
							<a
								href="#"
								className="fs-6"
								style={{ color: "#cc3300" }}
								onClick={(e) => {
									e.preventDefault()
									onAudioLike()
								}}>
								<HeartFilledSVG />
								<small className="ms-1" style={{ color: "inherit" }}>
									{audio.likes}
								</small>
							</a>
						) : (
							<a
								href="#"
								className="fs-6"
								onClick={(e) => {
									e.preventDefault()
									onAudioLike()
								}}>
								<HeartSVG />
								<small className="ms-1" style={{ color: "inherit" }}>
									{audio.likes}
								</small>
							</a>
						)}
					</div>

					{/* Share button */}
					<div className="p-2">
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault()
								props.auth.username != "@guest" && onShare()
							}}>
							<span className="fs-5">
								<ShareSVG />
							</span>
							<span className="ms-1">SHARE</span>
						</a>
					</div>

					{/* Download/Buy button */}
					{audio.hasBoughtAudio || props.auth?.username == "@blackmusic" ? (
						// Ensure audio is downloadable
						<div className="p-2">
							<Btn
								btnClass="mysonar-btn white-btn"
								btnText="download"
								onClick={onDownload}
							/>
						</div>
					) : (
						// Cart Btn
						<div className="p-2">
							{inCart ? (
								<button
									className="mysonar-btn white-btn mb-1"
									style={{ minWidth: "90px", height: "33px" }}
									onClick={onCartAudios}>
									<CartSVG />
								</button>
							) : (
								<Btn
									btnClass="mysonar-btn green-btn btn-2"
									btnText="KES 20"
									onClick={() => {
										// If user is guest then redirect to Login
										props.auth.username == "@guest"
											? onGuestBuy()
											: onBuyAudios()
									}}
								/>
							)}
						</div>
					)}
				</div>

				<div className="d-flex flex-row">
					<div className="p-2 me-auto">
						<h6
							className="m-0 p-0"
							style={{
								width: "300px",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "clip",
							}}>
							{audio.name}
						</h6>
						<h6>{audio.album}</h6>
						<h6>{audio.genre}</h6>
						<h6>{audio.createdAt}</h6>
					</div>
				</div>
				{/* Audio Info Area End */}

				{/* <!-- Read more section --> */}

				{/* {{-- Collapse --}} */}
				<div className="p-2 border-bottom border-dark">
					<button
						className="mysonar-btn white-btn"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseExample"
						aria-expanded="false"
						aria-controls="collapseExample">
						read more
					</button>
					<div className="collapse" id="collapseExample">
						<div className="p-2 text-white">{audio.description}</div>
					</div>
				</div>
				{/* {{-- Collapse End --}} */}

				{/* Artist Area */}
				<div className="border-bottom border-dark">
					<div className="d-flex">
						<div className="p-2">
							<Link to={`/profile/${audio.username}`}>
								<a>
									<Img
										src={audio.avatar}
										className="rounded-circle"
										width="30px"
										height="30px"
										alt="user"
										loading="lazy"
									/>
								</a>
							</Link>
						</div>
						<div className="p-2 flex-grow-1" style={{ width: "50%" }}>
							<Link to={`/profile/${audio.username}`}>
								<a>
									<div
										style={{
											// width: "50%",
											// whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										<b className="ml-2">{audio.artistName}</b>
										<small>
											<i>{audio.username}</i>
										</small>
										<span className="ms-1" style={{ color: "gold" }}>
											<DecoSVG />
											<small className="ms-1" style={{ color: "inherit" }}>
												{audio.artistDecos}
											</small>
										</span>
									</div>
								</a>
							</Link>
						</div>
						<div className="p-2">
							{/* Check whether user has bought at least one song from user */}
							{/* Check whether user has followed user and display appropriate button */}
							{audio.hasBought1 ||
							props.auth?.username == "@blackmusic" ||
							props.auth?.username != audio.username ? (
								hasFollowed ? (
									<button
										className={"btn float-right rounded-0 text-light"}
										style={{ backgroundColor: "#232323" }}
										onClick={onFollow}>
										<div>
											Followed
											<CheckSVG />
										</div>
									</button>
								) : (
									<Btn
										btnClass="mysonar-btn white-btn float-right"
										onClick={onFollow}
										btnText="follow"
									/>
								)
							) : (
								<Btn
									btnClass="mysonar-btn white-btn float-right"
									onClick={() =>
										props.setErrors([
											`You must have bought atleast one song by ${props.user.username}`,
										])
									}
									btnText="follow"
								/>
							)}
						</div>
					</div>
				</div>
				{/* Artist Area End */}

				<br />

				{/* Tab for Comment and Up Next */}
				<div className="d-flex">
					<div className="p-2 flex-fill anti-hidden">
						<h6
							className={tabClass == "comments" ? "active-scrollmenu" : "p-2"}
							onClick={() => setTabClass("comments")}>
							<center>Comments</center>
						</h6>
					</div>
					<div className="p-2 flex-fill anti-hidden">
						<h6
							className={
								tabClass == "recommended" ? "active-scrollmenu" : "p-1"
							}
							onClick={() => setTabClass("recommended")}>
							<center>Recommended</center>
						</h6>
					</div>
				</div>

				{/* <!-- Comment Form ---> */}
				<div className={tabClass == "comments" ? "" : "hidden"}>
					{audio.username == props.auth.username ||
					props.auth.username == "@blackmusic" ||
					audio.hasBoughtAudio ? (
						<Suspense
							fallback={
								<center>
									<div id="sonar-load" className="mt-5 mb-5"></div>
								</center>
							}>
							<SocialMediaInput
								{...props}
								id={id}
								placeholder="Add a comment"
								showImage={false}
								showPoll={false}
								urlTo="audio-comments"
								stateToUpdate={() => {
									props.get(`audio-comments/${id}`, setAudioComments)
								}}
								editing={false}
							/>
						</Suspense>
					) : (
						""
					)}
					{/* <!-- End of Comment Form --> */}

					{/* <!-- Comment Section --> */}
					{audio.username == props.auth.username ||
					props.auth.username == "@blackmusic" ||
					audio.hasBoughtAudio ? (
						// Check if audio comments exist
						audioComments.length > 0 ? (
							audioComments
								.filter((comment) => !deletedIds.includes(comment.id))
								.map((comment, key) => (
									<CommentMedia
										{...props}
										key={key}
										comment={comment}
										onCommentLike={onCommentLike}
										onDeleteComment={onDeleteComment}
									/>
								))
						) : (
							<center className="my-3">
								<h6 style={{ color: "grey" }}>No comments to show</h6>
							</center>
						)
					) : (
						""
					)}
				</div>
				{/* End of Comment Section */}
			</div>

			{/* -- Up next area -- */}
			<div
				className={tabClass == "recommended" ? "col-sm-3" : "col-sm-3 hidden"}>
				<div className="p-2 border-bottom border-dark">
					<h5>Up next</h5>
				</div>
				{!boughtAudios.some(
					(boughtAudio) => boughtAudio.username == props.auth.username
				) && (
					<center>
						<h6 className="mt-4" style={{ color: "grey" }}>
							You haven't bought any audios
						</h6>
					</center>
				)}

				{boughtAudios
					.filter((boughtAudio) => {
						return (
							boughtAudio.username == props.auth.username &&
							boughtAudio.audio_id != props.show
						)
					})
					.map((boughtAudio, key) => (
						<AudioMedia {...props} audio={audio} onBuyAudios={onBuyAudios} />
					))}
				{/* <!-- End of Up next Area --> */}

				{/* Song Suggestion Area */}
				<div className="p-2 mt-5 border-bottom border-dark">
					<h5>Songs to watch</h5>
				</div>
				{/* Loading Audio items */}
				{dummyArray
					.filter(() => props.audios.length < 1)
					.map((item, key) => (
						<LoadingAudioMedia key={key} />
					))}

				{audios
					.filter((audio) => {
						return (
							!audio.hasBoughtAudio &&
							audio.username != props.auth.username &&
							audio.id != id
						)
					})
					.slice(0, 10)
					.map((audio, key) => (
						<AudioMedia
							{...props}
							key={key}
							audio={audio}
							onBuyAudios={onBuyAudios}
						/>
					))}
			</div>
			{/* <!-- End of Song Suggestion Area --> */}
			<div className="1"></div>
		</div>
	)
}

export default AudioShow
