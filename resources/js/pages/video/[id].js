import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "@/lib/axios"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import CommentMedia from "@/components/Core/CommentMedia"
import VideoMedia from "@/components/Video/VideoMedia"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import ShareSVG from "@/svgs/ShareSVG"
import CartSVG from "@/svgs/CartSVG"
import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import DecoSVG from "@/svgs/DecoSVG"
import ssrAxios from "@/lib/ssrAxios"
import CheckSVG from "@/svgs/CheckSVG"

const VideoShow = (props) => {
	// let { referer } = router.query
	const router = useRouter()

	let { id } = router.query

	const [video, setVideo] = useState(props.video)
	const [videos, setVideos] = useState(props.videos)
	const [videoComments, setVideoComments] = useState(props.videoComments)
	const [boughtVideos, setBoughtVideos] = useState(
		props.getLocalStorage("boughtVideos")
	)
	const [inCart, setInCart] = useState(props.video.inCart)
	const [hasLiked, setHasLiked] = useState(props.video.hasLiked)
	const [hasFollowed, setHasFollowed] = useState(props.video.hasFollowed)
	const [tabClass, setTabClass] = useState("comments")
	const [deletedIds, setDeletedIds] = useState([])

	useEffect(() => {
		if (id) {
			axios
				.get(`/api/videos/${id}`)
				.then((res) => setVideo(res.data.data))
				.catch(() => props.setErrors([`Failed to fetch video`]))

			props.get(`video-comments/${id}`, setVideoComments)
		}

		// Fetch Videos
		props.get("videos", setVideos, "videos")
		// Fetch Bought Videos
		props.get("bought-videos", setBoughtVideos, "boughtVideos")
	}, [id])

	/*
	 * Function for liking video */
	const onVideoLike = () => {
		// Show Like
		setHasLiked(!hasLiked)
		// Add like to database
		axios
			.post(`/api/video-likes`, { video: id })
			.then((res) => {
				props.setMessages([res.data.message])

				// Fetch Audio
				axios
					.get(`api/videos/${id}`)
					.then((res) => setVideo(res.data.data))
					.catch((err) => props.getErrors(err))
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Buy function */
	const onBuyVideos = () => {
		onCartVideos()
		setTimeout(() => router.push("/cart"), 500)
	}

	/*
	 * Function for adding video to cart */
	const onCartVideos = () => {
		// Show in cart
		setInCart(!inCart)
		// Add Video to Cart
		axios
			.post(`/api/cart-videos`, { video: props.video.id })
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err, true))
	}

	/*
	 * Function for downloading audio */
	const onDownload = () => {
		window.open(`${props.url}/api/videos/download/${video.id}`)
		props.setMessages([`Downloading ${video.name}`])
	}

	/*
	 * Function for following Musicans */
	const onFollow = () => {
		// Show follow
		setHasFollowed(!hasFollowed)

		// Add follow
		axios
			.post(`/api/follows`, { musician: video.username })
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err, true))
	}

	/*
	 * Function for liking comments */
	const onCommentLike = (comment) => {
		// Add like to database
		axios
			.post(`/api/video-comment-likes`, {
				comment: comment,
			})
			.then((res) => {
				props.setMessages([res.data.message])
				props.get(`video-comments/${id}`, setVideoComments)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for deleting comments */
	const onDeleteComment = (comment) => {
		// Remove deleted comment
		setDeletedIds([...deletedIds, comment])

		axios
			.delete(`/api/video-comments/${comment}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: video.name,
			text: `Check out ${video.name} on Black Music\n`,
			url: `https://music.black.co.ke/#/video/${id}/${props.auth.username}`,
		}
		// Check if data is shareble
		navigator.canShare(shareData) && navigator.share(shareData)
	}

	// const onGuestBuy = () => {
	// props.setLogin(true)
	// sessionStorage.setItem("referer", referer)
	// sessionStorage.setItem("page", location.pathname)
	// }

	return (
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-7">
				{video.video ? (
					video.video.match(/https/) ? (
						<div className="resp-container">
							<iframe
								className="resp-iframe"
								width="880px"
								height="495px"
								src={
									video.hasBoughtVideo
										? `${video.video}/?autoplay=1`
										: `${video.video}?autoplay=1&end=10&controls=0`
								}
								allow="accelerometer"
								encrypted-media="true"
								gyroscope="true"
								picture-in-picture="true"
								allowFullScreen></iframe>
						</div>
					) : (
						<div className="resp-container">
							<video
								className="resp-iframe"
								width="880px"
								height="495px"
								controls={video.hasBoughtVideo && true}
								controlsList="nodownload"
								autoPlay>
								<source
									src={
										video.hasBoughtVideo
											? `${video.video}`
											: `${video.video}#t=1,10`
									}
									type="video/mp4"
								/>
							</video>
						</div>
					)
				) : (
					""
				)}

				{/* Video Info Area */}
				<div className="d-flex justify-content-between">
					{/* Video likes */}
					<div className="p-2 me-2">
						{hasLiked ? (
							<a
								href="#"
								className="fs-6"
								style={{ color: "#cc3300" }}
								onClick={(e) => {
									e.preventDefault()
									onVideoLike()
									setHasLiked(!hasLiked)
								}}>
								<HeartFilledSVG />
								<small
									className="ms-1"
									style={{ color: "inherit", fontWeight: "100" }}>
									{video.likes}
								</small>
							</a>
						) : (
							<a
								href="#"
								className="fs-6"
								onClick={(e) => {
									e.preventDefault()
									onVideoLike()
								}}>
								<HeartSVG />
								<small
									className="ms-1"
									style={{ color: "inherit", fontWeight: "100" }}>
									{video.likes}
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
					{video.hasBoughtVideo || props.auth?.username == "@blackmusic" ? (
						// Ensure video is downloadable
						!video.video.match(/https/) && (
							<div className="p-2">
								<Btn
									btnClass="mysonar-btn white-btn"
									btnText="download"
									onClick={onDownload}
								/>
							</div>
						)
					) : (
						// Cart Btn
						<div className="p-2">
							{inCart ? (
								<button
									className="mysonar-btn white-btn mb-1"
									style={{ minWidth: "90px", height: "33px" }}
									onClick={onCartVideos}>
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
											: onBuyVideos()
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
							{video.name}
						</h6>
						<h6>{video.album}</h6>
						<h6>{video.genre}</h6>
						<h6>{video.createdAt}</h6>
					</div>
				</div>
				{/* Video Info Area End */}

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
						<div className="p-2 text-white">{video.description}</div>
					</div>
				</div>
				{/* {{-- Collapse End --}} */}

				{/* Artist Area */}
				<div className="border-bottom border-dark">
					<div className="d-flex">
						<div className="p-2">
							<Link href={`/profile/${video.username}`}>
								<a>
									<Img
										src={video.avatar}
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
							<Link href={`/profile/${video.username}`}>
								<a>
									<div
										style={{
											// width: "50%",
											// whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										<b className="ml-2">{video.artistName}</b>
										<small>
											<i>{video.username}</i>
										</small>
										<span className="ms-1" style={{ color: "gold" }}>
											<DecoSVG />
											<small className="ms-1" style={{ color: "inherit" }}>
												{video.artistDecos}
											</small>
										</span>
									</div>
								</a>
							</Link>
						</div>
						<div className="p-2">
							{/* Check whether user has bought at least one song from user */}
							{/* Check whether user has followed user and display appropriate button */}
							{video.hasBought1 ||
							props.auth?.username == "@blackmusic" ||
							props.auth?.username != video.username ? (
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
					{video.username == props.auth.username ||
					props.auth.username == "@blackmusic" ||
					video.hasBoughtVideo ? (
						<SocialMediaInput
							{...props}
							id={id}
							placeholder="Add a comment"
							showImage={false}
							showPoll={false}
							urlTo="video-comments"
							stateToUpdate={() => {
								props.get(`video-comments/${id}`, setVideoComments)
							}}
							editing={false}
						/>
					) : (
						""
					)}
					{/* <!-- End of Comment Form --> */}
					<br />

					{/* <!-- Comment Section --> */}
					{video.username == props.auth.username ||
					props.auth.username == "@blackmusic" ||
					video.hasBoughtVideo ? (
						// Check if video comments exist
						videoComments.length > 0 ? (
							videoComments
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
			</div>
			{/* <!-- End of Comment Section --> */}

			{/* -- Up next area -- */}
			<div
				className={tabClass == "recommended" ? "col-sm-3" : "col-sm-3 hidden"}>
				<div className="p-2">
					<h5>Up next</h5>
				</div>
				{!boughtVideos.some(
					(boughtVideo) => boughtVideo.username == props.auth.username
				) && (
					<center>
						<h6 style={{ color: "grey" }}>You haven't bought any videos</h6>
					</center>
				)}

				{boughtVideos
					.filter((boughtVideo) => boughtVideo.video_id != id)
					.map((boughtVideo, key) => (
						<VideoMedia
							{...props}
							key={key}
							video={boughtVideo}
							onBuyVideos={onBuyVideos}
							onClick={() => props.setShow(0)}
						/>
					))}
				{/* <!-- End of Up next Area --> */}

				{/* Songs to watch Area */}
				<div className="p-2 mt-5">
					<h5>Songs to watch</h5>
				</div>
				{videos
					.filter((video) => {
						return (
							!video.hasBoughtVideo &&
							video.username != props.auth.username &&
							video.id != id
						)
					})
					.slice(0, 10)
					.map((video, key) => (
						<VideoMedia
							{...props}
							key={key}
							video={video}
							onBuyVideos={onBuyVideos}
							onClick={() => props.setShow(0)}
						/>
					))}
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

// This gets called on every request
export async function getServerSideProps(context) {
	const { id } = context.query

	var data = {
		video: {},
		videoComments: {},
		videos: {},
	}

	// Fetch Post Comments
	await ssrAxios
		.get(`/api/videos/${id}`)
		.then((res) => (data.video = res.data.data))
	await ssrAxios
		.get(`/api/video-comments/${id}`)
		.then((res) => (data.videoComments = res.data.data))
	await ssrAxios.get(`/api/videos`).then((res) => (data.videos = res.data.data))

	// Pass data to the page via props
	return { props: data }
}

export default VideoShow
