import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import axios from 'axios'

import Img from '../components/Img'
import Button from '../components/Button'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'

import OptionsSVG from '../svgs/OptionsSVG'
import CloseSVG from '../svgs/CloseSVG'
import ShareSVG from '../svgs/ShareSVG'
import CartSVG from '../svgs/CartSVG'
import CheckSVG from '../svgs/CheckSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import HeartSVG from '../svgs/HeartSVG'
import DecoSVG from '../svgs/DecoSVG'

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))
const SocialMediaInput = React.lazy(() => import('../components/SocialMediaInput'))

const VideoShow = (props) => {

	axios.defaults.baseURL = props.url

	let { show } = useParams()
	let { referer } = useParams()
	let history = useHistory()
	const location = useLocation()

	var showVideo = []
	var showArtist = []

	// Get Video to show
	if (props.videos.find((video) => video.id == show)) {
		var showVideo = props.videos.find((video) => video.id == show)

		// Get Artist
		if (props.users.find((user) => user.username == showVideo.username)) {
			var showArtist = props.users.find((user) => user.username == showVideo.username)
		}
	}

	const [tabClass, setTabClass] = useState("comments")
	const [videoComments, setVideoComments] = useState(props.getLocalStorage("videoComments"))
	const [bottomMenu, setBottomMenu] = useState("")
	const [postToEdit, setPostToEdit] = useState()

	var deleteLink = useRef(null)

	useEffect(() => {

		// Set states
		setTimeout(() => {
			props.setPlaceholder("Add a comment")
			props.setText("")
			props.setId(show)
			props.setShowImage(false)
			props.setShowPoll(false)
			props.setShowEmojiPicker(false)
			props.setShowImagePicker(false)
			props.setShowPollPicker(false)
			props.setUrlTo("/video-comments")
			props.setUrlToDelete(`/video-comments/${props.media.substr(11)}`)
			props.setStateToUpdate(() => setVideoComments)
			props.setEditing(false)
		}, 1000)

		// Fetch Video Comments
		axios.get(`/api/video-comments`)
			.then((res) => {
				setVideoComments(res.data)
				props.setLocalStorage("videoComments", res.data)
			}).catch(() => props.setErrors(["Failed to fetch video comments"]))
	}, [])

	// Function for liking video
	const onVideoLike = () => {
		// Show like
		const newVideos = props.videos
			.filter((item) => {
				// Get the exact audio and change like status
				if (item.id == show) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new videos
		props.setVideos(newVideos)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-likes`, {
				video: show
			}).then((res) => {
				props.setMessages(res.data)
				// Update videos
				axios.get(`${props.url}/api/videos`)
					.then((res) => props.setVideos(res.data))
			}).catch((err) => {
				console.log(err.response.data.message)
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

	// Function for liking comments
	const onCommentLike = (comment) => {
		// Show like
		const newVideoComments = videoComments
			.filter((item) => {
				// Get the exact video and change like status
				if (item.id == comment) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new videos
		setVideoComments(newVideoComments)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessages(res.data)
				// Update Video Comments
				axios.get(`${props.url}/api/video-comments`)
					.then((res) => setVideoComments(res.data))
			}).catch((err) => {
				console.log(err.response.data.message)
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

	// Function for deleting comments
	const onDeleteComment = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/video-comments/${id}`)
				.then((res) => {
					props.setMessages(res.data)
					// Update Video Comments
					axios.get(`${props.url}/api/video-comments`)
						.then((res) => setVideoComments(res.data))
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

	// Function for buying video to cart
	const onBuyVideos = (video) => {
		props.onCartVideos(video)
		setTimeout(() => history.push('/cart'), 1000)
	}

	// Function for downloading audio
	const onDownload = () => {
		window.open(`${props.url}/api/videos/${showVideo.id}`)
		props.setMessages(`Downloading ${showVideo.name}`)
	}

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: showVideo.name,
			text: `Check out ${showVideo.name} on Black Music\n`,
			url: `https://music.black.co.ke/#/video-show/${show}/${props.auth.username}`
		}
		// Check if data is shareble
		navigator.canShare(shareData) &&
			navigator.share(shareData)
	}

	const onGuestBuy = () => {
		props.setLogin(true)
		sessionStorage.setItem("referer", referer)
		sessionStorage.setItem("page", location.pathname)
	}

	return (
		<>
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-7">
					{showVideo.video ?
						showVideo.video.match(/https/) ?
							<div className="resp-container">
								<iframe className='resp-iframe'
									width='880px'
									height='495px'
									src={showVideo.hasBoughtVideo ?
										`${showVideo.video}/?autoplay=1` :
										`${showVideo.video}?autoplay=1&end=10&controls=0`}
									frameBorder='0'
									allow='accelerometer'
									encrypted-media="true"
									gyroscope="true"
									picture-in-picture="true"
									allowFullScreen>
								</iframe>
							</div> :
							<div className="resp-container">
								<video
									className="resp-iframe"
									width="880px"
									height="495px"
									controls={showVideo.hasBoughtVideo && true}
									controlsList="nodownload"
									autoPlay>
									<source
										src={showVideo.hasBoughtVideo ?
											`storage/${showVideo.video}` :
											`storage/${showVideo.video}#t=1,10`}
										type="video/mp4" />
								</video>
							</div> : ""}

					<div className="d-flex justify-content-between">
						{/* Video likes */}
						<div className="p-2 mr-2">
							{showVideo.hasLiked ?
								<a href="#" style={{ color: "#cc3300" }}
									onClick={(e) => {
										e.preventDefault()
										onVideoLike()
									}}>
									<HeartFilledSVG />
									<small className="ml-1">{showVideo.likes}</small>
								</a> :
								<a href='#' onClick={(e) => {
									e.preventDefault()
									onVideoLike()
								}}>
									<HeartSVG />
									<small className="ml-1">{showVideo.likes}</small>
								</a>}
						</div>

						{/* Share button */}
						<div className="p-2">
							<a href="#"
								onClick={(e) => {
									e.preventDefault()
									props.auth.username != "@guest" && onShare()
								}}>
								<ShareSVG />
								<span className="ml-1">SHARE</span>
							</a>
						</div>

						{/* Download/Buy button */}
						{showVideo.hasBoughtVideo ?
							// Ensure video is downloadable
							!showVideo.video.match(/https/) &&
							<div className="p-2">
								<Button
									btnClass="mysonar-btn white-btn"
									btnText="download"
									onClick={onDownload} />
							</div> :
							// Cart Button
							showVideo.inCart ?
								<div className="p-2">
									<button className="btn btn-light mb-1 rounded-0"
										style={{ minWidth: '90px', height: '33px' }}
										onClick={() => props.onCartVideos(show)}>
										<CartSVG />
									</button>
								</div> :
								<div className="p-2">
									<Button
										btnClass={'btn mysonar-btn green-btn btn-2'}
										btnText={'KES 20'}
										onClick={() => {
											// If user is guest then redirect to Login
											props.auth.username == "@guest" ?
												onGuestBuy() :
												onBuyVideos(show)
										}} />
								</div>}
					</div>

					<div className="d-flex flex-row">
						<div className="p-2 mr-auto">
							<h6 className="m-0 p-0"
								style={{
									width: "200px",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip"
								}}>
								<small>Song name {showVideo.name}</small>
							</h6>
							<small>Album</small>
							<span className="p-1">{showVideo.album}
							</span><br />
							<small>Genre</small><span className="p-1">{showVideo.genre}</span><br />
							<small>Posted</small><span className="p-1">{showVideo.created_at}</span>
						</div>
					</div>
					{/* Video Area End */}

					{/* <!-- Read more section --> */}
					<div className="p-2 border-bottom border-dark">
						<button
							href="#collapseExample"
							className="mysonar-btn white-btn"
							data-toggle="collapse"
							aria-expanded="false"
							aria-controls="collapseExample">
							Read more
						</button>
						<div className="collapse" id="collapseExample">
							<div className="m-2">
								{showVideo.description}
							</div>
						</div>
					</div>

					{/* Artist Area */}
					<div className="p-2 border-bottom border-dark">
						<div className='media'>
							<div className='media-left'>
								<Link to={`/profile/${showArtist.username}`}>
									<Img
										src={showArtist.pp}
										imgClass="rounded-circle"
										width={"40px"}
										height={"40px"} />
								</Link>
							</div>
							<div className='media-body'>
								<h6 className="ml-1 mb-0 p-0"
									style={{
										width: "140px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									<small>{showArtist.name}{showArtist.username}</small>
									<span className="ml-1" style={{ color: "gold" }}>
										<DecoSVG />
										<small className="ml-1">{showArtist.decos}</small>
									</span>
								</h6>
								{/* <span className="ml-1" style={{ fontSize: "1rem" }}>&#x2022;</span> */}
								<small className="ml-1"> {showArtist.fans} fans</small>

								{/* Check whether user has bought at least one song from musician */}
								{/* Check whether user has followed musician and display appropriate button */}
								{showArtist.username != props.auth.username ?
									showArtist.hasBought1 || props.auth.username == "@blackmusic" ?
										showArtist.hasFollowed ?
											<button
												className={'btn text-white float-right rounded-0'}
												style={{ backgroundColor: "#232323" }}
												onClick={() => props.onFollow(showArtist.username)}>
												Followed
												<CheckSVG />
											</button> :
											<Button
												btnClass={'mysonar-btn white-btn float-right'}
												onClick={() => props.onFollow(showArtist.username)}
												btnText={'follow'} /> :
										<Button
											btnClass={'mysonar-btn white-btn float-right'}
											onClick={() => props.setErrors([`You must have bought atleast one song by ${showArtist.username}`])}
											btnText={'follow'} /> : ""}
							</div>
						</div>
					</div>
					{/* Artist Area End */}

					<br />

					{/* Tab for Comment and Up Next */}
					<div className="d-flex">
						<div className="p-2 flex-fill anti-hidden">
							<h6 className={tabClass == "comments" ? "active-scrollmenu" : "p-2"}
								onClick={() => setTabClass("comments")}>
								<center>Comments</center>
							</h6>
						</div>
						<div className="p-2 flex-fill anti-hidden">
							<h6 className={tabClass == "recommended" ? "active-scrollmenu" : "p-1"}
								onClick={() => setTabClass("recommended")}>
								<center>Recommended</center>
							</h6>
						</div>
					</div>

					{/* <!-- Comment Form ---> */}
					<div className={tabClass == "comments" ? "" : "hidden"}>
						{showVideo.username == props.auth.username ||
							props.auth.username == "@blackmusic" ||
							showVideo.hasBoughtVideo ?
							<form
								onSubmit={props.onSubmit}
								className="contact-form bg-white mb-2"
								autoComplete="off">
								<Suspense
									fallback={
										<center>
											<div id="sonar-load" className="mt-5 mb-5"></div>
										</center>
									}>
									<SocialMediaInput {...props} />
								</Suspense>
							</form> : ""}
						{/* <!-- End of Comment Form --> */}

						{/* <!-- Comment Section --> */}
						{showVideo.username == props.auth.username ||
							props.auth.username == "@blackmusic" ||
							showVideo.hasBoughtVideo ?
							// Check if comments exists
							videoComments
								.filter((comment) => comment.video_id == show).length > 0 ?
								videoComments
									.filter((comment) => comment.video_id == show)
									.map((comment, index) => (
										<div key={index} className='media p-2'>
											<div className='media-left'>
												<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
													<Link to={`/profile/${comment.username}`}>
														<Img src={comment.pp}
															width="50px"
															height="50px" />
													</Link>
												</div>
											</div>
											<div className="media-body ml-2">
												<h6 className="media-heading m-0"
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>
													<b>{comment.name}</b>
													<small>{comment.username} </small>
													<span style={{ color: "gold" }}>
														<DecoSVG />
														<span className="ml-1" style={{ fontSize: "10px" }}>
															{comment.decos}
														</span>
													</span>
													<small>
														<b><i className="float-right mr-1 text-secondary">{comment.created_at}</i></b>
													</small>
												</h6>
												<p className="mb-0">{comment.text}</p>

												{/* Comment likes */}
												{comment.hasLiked ?
													<a href="#" style={{ color: "#cc3300" }}
														onClick={(e) => {
															e.preventDefault()
															onCommentLike(comment.id)
														}}>
														<HeartFilledSVG />
														<small className="ml-1" style={{ color: "inherit" }}>{comment.likes}</small>
													</a> :
													<a href='#' onClick={(e) => {
														e.preventDefault()
														onCommentLike(comment.id)
													}}>
														<HeartSVG />
														<small className="ml-1" style={{ color: "inherit" }}>{comment.likes}</small>
													</a>}

												{/* <!-- Default dropup button --> */}
												<div className="dropup float-right hidden">
													<a
														href="#"
														role="button"
														id="dropdownMenuLink"
														data-toggle="dropdown"
														aria-haspopup="true"
														aria-expanded="false">
														<OptionsSVG />
													</a>
													<div
														className="dropdown-menu dropdown-menu-right p-0"
														style={{ borderRadius: "0", backgroundColor: "#232323" }}>
														{comment.username == props.auth.username &&
															<a href='#' className="dropdown-item" onClick={(e) => {
																e.preventDefault();
																onDeleteComment(comment.id)
															}}>
																<h6>Delete comment</h6>
															</a>}
													</div>
												</div>
												{/* For small screens */}
												<div className="float-right anti-hidden">
													<span
														className="text-secondary"
														onClick={() => {
															if (comment.username == props.auth.username) {
																setBottomMenu("menu-open")
																setPostToEdit(comment.id)
																// Show and Hide elements
																deleteLink.current.className = "d-block"
															}
														}}>
														<OptionsSVG />
													</span>
												</div>
											</div>
										</div>
									)) :
								<center className="my-3">
									<h6 style={{ color: "grey" }}>No comments to show</h6>
								</center> : ""}
					</div>
				</div>
				{/* <!-- End of Comment Section --> */}

				{/* -- Up next area -- */}
				<div className={tabClass == "recommended" ? "col-sm-3" : "col-sm-3 hidden"}>
					<div className="p-2">
						<h5>Up next</h5>
					</div>
					{!props.boughtVideos
						.some((boughtVideo) => boughtVideo.username == props.auth.username) &&
						<center>
							<h6 style={{ color: "grey" }}>You haven't bought any videos</h6>
						</center>}

					{props.boughtVideos
						.filter((boughtVideo) => {
							return boughtVideo.username == props.auth.username &&
								boughtVideo.video_id != show
						}).map((boughtVideo, key) => (
							<Suspense key={key} fallback={<LoadingVideoMediaHorizontal />}>
								<VideoMediaHorizontal
									key={key}
									onClick={() => props.setShow(0)}
									// onClick={
									// 	window.scrollBy({
									// 		top: -window.innerHeight,
									// 		right: 0,
									// 		behavior: "smooth"
									// 	})}
									setShow={props.setShow}
									link={`/video-show/${boughtVideo.video_id}`}
									thumbnail={boughtVideo.thumbnail}
									name={boughtVideo.name}
									username={boughtVideo.username}
									ft={boughtVideo.ft}
									showCartandBuyButton={false} />
							</Suspense>
						))}
					{/* <!-- End of Up next Area --> */}

					{/* Songs to watch Area */}
					<div className="p-2 mt-5">
						<h5>Songs to watch</h5>
					</div>
					{props.videos
						.filter((video) => {
							return !video.hasBoughtVideo &&
								video.username != props.auth.username &&
								video.id != show
						}).slice(0, 10)
						.map((video, key) => (
							<Suspense
								key={key}
								fallback={<LoadingVideoMediaHorizontal />}>
								<VideoMediaHorizontal
									key={key}
									onClick={() => props.setShow(0)}
									// onClick={
									// 	window.scrollBy({
									// 		top: -window.innerHeight,
									// 		right: 0,
									// 		behavior: "smooth"
									// 	})}
									setShow={props.setShow}
									link={`/video-show/${video.id}`}
									thumbnail={video.thumbnail}
									name={video.name}
									username={video.username}
									ft={video.ft}
									videoInCart={video.inCart}
									hasBoughtVideo={!video.hasBoughtVideo}
									videoId={video.id}
									onCartVideos={props.onCartVideos}
									onBuyVideos={onBuyVideos} />
							</Suspense>
						))}
				</div>
				<div className="col-sm-1"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "2em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>
					<div
						ref={deleteLink}
						onClick={() => {
							setBottomMenu("")
							onDeleteComment(postToEdit)
						}}>
						<h6 className="pb-2">Delete post</h6>
					</div>
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default VideoShow
