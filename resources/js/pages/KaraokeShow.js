import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'

import Img from '../components/Img'

import CloseSVG from '../svgs/CloseSVG'
import CommentSVG from '../svgs/CommentSVG'
import DecoSVG from '../svgs/DecoSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import HeartSVG from '../svgs/HeartSVG'
import ShareSVG from '../svgs/ShareSVG'
import MusicNoteSVG from '../svgs/MusicNoteSVG'
import OptionsSVG from '../svgs/OptionsSVG'

const SocialMediaInput = React.lazy(() => import('../components/SocialMediaInput'))

const KaraokeShow = (props) => {

	const { id } = useParams()

	const [karaoke, setKaraoke] = useState([])
	const [karaokeComments, setKaraokeComments] = useState([])
	const [bottomMenu, setBottomMenu] = useState()
	const [bottomOptionsMenu, setBottomOptionsMenu] = useState()
	const [postToEdit, setPostToEdit] = useState()

	// ID for Video Description
	const karaokeDescription = useRef()

	// ID for Video Description text
	const showDescription = useRef()

	// ID for delete link
	var deleteLink = useRef(null)

	useEffect(() => {
		// Fetch Karaoke
		axios.get(`/api/karaokes/${id}`)
			.then((res) => {
				setKaraoke(res.data)
			}).catch(() => props.setErrors(["Failed to fetch karaoke"]))

		// Fetch Karaoke Comments
		axios.get(`/api/karaoke-comments`)
			.then((res) => {
				setKaraokeComments(res.data)
			}).catch(() => props.setErrors(["Failed to fetch karaoke comments"]))

		// Set states
		setTimeout(() => {
			props.setPlaceholder("Add a comment")
			props.setText("")
			props.setId(id)
			props.setShowImage(false)
			props.setShowPoll(false)
			props.setShowEmojiPicker(false)
			props.setShowImagePicker(false)
			props.setShowPollPicker(false)
			props.setUrlTo("/karaoke-comments")
			props.setUrlToDelete(`/karaoke-comments/${props.media.substr(11)}`)
			props.setStateToUpdate(() => setKaraokeComments)
			props.setEditing(false)
		}, 1000)
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
		const newKaraoke = { ...karaoke, "hasLiked": !karaoke.hasLiked }

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

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: karaoke.audio,
			text: `Check out this karaoke on Black Music\n`,
			url: `https://music.black.co.ke/#/karaoke-show/${id}`
		}
		// Check if data is shareble
		navigator.canShare(shareData) &&
			navigator.share(shareData)
	}

	// Function for deleting comments
	const onDeleteComment = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/karaoke-comments/${id}`)
				.then((res) => {
					props.setMessages([res.data])
					// Update karaoke comments
					axios.get(`${props.url}/api/karaoke-comments`)
						.then((res) => setKaraokeComments(res.data))
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
		const newKaraokeComments = karaokeComments
			.filter((item) => {
				// Get the exact karaoke and change like status
				if (item.id == comment) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new karaokes
		setKaraokeComments(newKaraokeComments)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/karaoke-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessages([res.data])
				// Update karaoke comments
				axios.get(`${props.url}/api/karaoke-comments`)
					.then((res) => setKaraokeComments(res.data))
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
								{/* Description */}
								<p
									ref={karaokeDescription}
									className="m-0 mx-1 p-0"
									style={{ display: "none" }}>
									{karaoke.description}
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
												onClick={() => onShare()}>
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
					<div
						className="d-flex align-items-center justify-content-between border-bottom border-dark"
						style={{ height: "3em" }}>
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

					{/* Comment Form */}
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
					</form>

					{/* Karaoke Comments */}
					<div className="m-0 p-0">
						<div style={{ maxHeight: window.innerHeight * 0.60, overflowY: "scroll" }}>
							{/* Get Notifications */}

							{/* <!-- Comment Section --> */}
							{karaokeComments
								.filter((comment) => comment.karaoke_id == id)
								.length > 0 ?
								karaokeComments
									.filter((comment) => comment.karaoke_id == id)
									.map((comment, index) => (
										<div key={index} className="d-flex p-2">
											<div className="">
												<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
													<Link to={`/profile/${comment.username}`}>
														<Img src={comment.pp}
															width="50px"
															height="50px" />
													</Link>
												</div>
											</div>
											<div className="flex-grow-1 ml-2 text-left">
												<h6 className="media-heading m-0"
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>
													<b>{comment.name}</b>
													<small>{comment.username}</small>
													<span className="ml-1" style={{ color: "gold" }}>
														<DecoSVG />
														<span className="ml-1" style={{ fontSize: "10px" }}>{comment.decos}</span>
													</span>
													<small>
														<b>
															<i className="float-right mr-1 text-secondary">
																{comment.created_at}
															</i>
														</b>
													</small>
												</h6>
												<p className="mb-0 text-light">{comment.text}</p>

												{/* Comment likes */}
												{comment.hasLiked ?
													<a href="#"
														style={{ color: "#fb3958" }}
														onClick={(e) => {
															e.preventDefault()
															onCommentLike(comment.id)
														}}>
														<HeartFilledSVG />
														<small className="ml-1" style={{ color: "inherit" }}>
															{comment.likes}
														</small>
													</a> :
													<a href='#'
														className="text-light"
														onClick={(e) => {
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
															<a
																href='#'
																className="dropdown-item"
																onClick={(e) => {
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
																setBottomOptionsMenu("menu-open")
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
								</center>}
						</div>
						{/* Karaoke Comments End */}
					</div>
				</div>
			</div>
			{/* Sliding Bottom Nav End */}

			{/* Sliding Bottom Nav */}
			<div className={bottomOptionsMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "1em" }}
							onClick={() => setBottomOptionsMenu("")}>
							<CloseSVG />
						</div>
					</div>
					<div
						ref={deleteLink}
						onClick={() => {
							setBottomOptionsMenu("")
							onDeleteComment(postToEdit)
						}}>
						<h6 className="pb-2">Delete comment</h6>
					</div>
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default KaraokeShow