import React, { useState, useEffect, Suspense } from 'react'
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import axios from 'axios'

import Img from '../components/Img'
import Button from '../components/Button'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))

const VideoShow = (props) => {

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

	const [text, setText] = useState("")
	const [tabClass, setTabClass] = useState("comments")
	const [videoComments, setVideoComments] = useState(props.getLocalStorage("videoComments"))


	axios.defaults.baseURL = props.url

	// Fetch Video Comments
	useEffect(() => {
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
				props.setMessage(res.data)
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

	// Function for posting comment
	const onComment = (e) => {
		e.preventDefault()

		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-comments`, {
				video: show,
				text: text
			}).then((res) => {
				props.setMessage(res.data)
				// Update Video Comments
				axios.get(`${props.url}/api/video-comments`)
					.then((res) => setVideoComments(res.data))
				// Return text to null 
				setText("")
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
				props.setMessage(res.data)
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
					props.setMessage(res.data)
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
		props.setMessage(`Downloading ${showVideo.name}`)
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
								<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
									className='bi bi-heart-fill' viewBox='0 0 16 16'>
									<path fillRule='evenodd'
										d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
								</svg>
								<small className="ml-1">{showVideo.likes}</small>
							</a> :
							<a href='#' onClick={(e) => {
								e.preventDefault()
								onVideoLike()
							}}>
								<svg xmlns='http://www.w3.org/2000/svg'
									width='1.2em'
									height='1.2em'
									fill='currentColor'
									className='bi bi-heart'
									viewBox='0 0 16 16'>
									<path
										d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
								</svg>
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
							<svg className='bi bi-reply'
								width='1.5em'
								height='1.5em'
								viewBox='0 0 16 16'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'>
								<path fillRule='evenodd'
									d='M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z' />
							</svg>
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
									<svg className='bi bi-cart3'
										width='1em'
										height='1em'
										viewBox='0 0 16 16'
										fill='currentColor'
										xmlns='http://www.w3.org/2000/svg'>
										<path fillRule='evenodd'
											d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
									</svg>
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
									<svg className="bi bi-circle"
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd"
											d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
									</svg>
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
											<svg className='bi bi-check' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
												<path fillRule='evenodd'
													d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z' />
											</svg>
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
						<div className='media p-2'>
							<div className="media-left">
								<Img
									src={props.auth.pp}
									imgClass="rounded-circle"
									width="40px"
									height="40px" />
							</div>
							<div className="media-body contact-form">
								<form onSubmit={onComment}>
									<input
										type="text"
										className="form-control"
										placeholder="Add a comment"
										value={text}
										onChange={(e) => setText(e.target.value)} />
									<br />
									<Button
										type="submit"
										btnClass={"mysonar-btn white-btn float-right"}
										btnText={"Comment"} />
								</form>
							</div>
						</div> : ""}
					{/* <!-- End of Comment Form --> */}

					{/* <!-- Comment Section --> */}
					{showVideo.username == props.auth.username ||
						props.auth.username == "@blackmusic" ||
						showVideo.hasBoughtVideo ?
						// Check if comments exists
						videoComments
							.filter((comment) => comment.video_id == show)
							.length > 0 ?
							videoComments
								.filter((comment) => comment.video_id == show)
								.map((comment, index) => (
									<div key={index} className='media p-2 border-bottom border-dark'>
										<div className='media-left'>
											<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
												<Link to={`/profile/${comment.username}`}>
													<Img src={comment.pp}
														width="40px"
														height="40px" />
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
													<svg className="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
														fill="currentColor" xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd"
															d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
													</svg>
													<span className="ml-1" style={{ fontSize: "10px" }}>
														{comment.decos}
													</span>
												</span>
												<small>
													<i className="float-right mr-1">{comment.created_at}</i>
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
													<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
														className='bi bi-heart-fill' viewBox='0 0 16 16'>
														<path fillRule='evenodd'
															d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
													</svg>
													<small className="ml-1" style={{ color: "inherit" }}>{comment.likes}</small>
												</a> :
												<a href='#' onClick={(e) => {
													e.preventDefault()
													onCommentLike(comment.id)
												}}>
													<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
														className='bi bi-heart' viewBox='0 0 16 16'>
														<path
															d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
													</svg>
													<small className="ml-1" style={{ color: "inherit" }}>{comment.likes}</small>
												</a>}

											{/* <!-- Default dropup button --> */}
											<div className="dropup float-right">
												<a
													href="#"
													role="button"
													id="dropdownMenuLink"
													data-toggle="dropdown"
													aria-haspopup="true"
													aria-expanded="false">
													<svg
														className="bi bi-three-dots-vertical"
														width="1em"
														height="1em"
														viewBox="0 0 16 16"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd"
															d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
													</svg>
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
										</div>
									</div>
								)) :
							<center className="my-5">
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
	)
}

export default VideoShow
