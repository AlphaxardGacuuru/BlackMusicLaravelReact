import React, { useState, useRef, useEffect, Suspense } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'

import CloseSVG from '../svgs/CloseSVG'
import DecoSVG from '../svgs/DecoSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import HeartSVG from '../svgs/HeartSVG'
import OptionsSVG from '../svgs/OptionsSVG'

const SocialMediaInput = React.lazy(() => import('../components/SocialMediaInput'))

const KaraokeCommentSection = (props) => {

	const [bottomOptionsMenu, setBottomOptionsMenu] = useState()
	const [postToEdit, setPostToEdit] = useState()

	// ID for delete link
	var deleteLink = useRef()

	useEffect(() => {
		// Set states
		setTimeout(() => {
			props.setPlaceholder("Add a comment")
			props.setShowImage(false)
			props.setShowPoll(false)
			props.setShowEmojiPicker(false)
			props.setShowImagePicker(false)
			props.setShowPollPicker(false)
		}, 1000)
	})

	// Declare new FormData object for form data
	const formData = new FormData();

	// Handle form submit for Social Input
	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("text", props.text);
		formData.append("id", props.id);

		// Send data to HelpPostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`/api/karaoke-comments`, formData)
				.then((res) => {
					props.setMessages([res.data])
					// Updated Karaoke Comments One
					axios.get(`/api/karaoke-comments`)
						.then((res) => props.setKaraokeComments(res.data))
					// Clear text unless editing
					props.setText("")
					props.setShowMentionPicker(false)
					props.setShowEmojiPicker(false)
					props.setShowImagePicker(false)
					props.setShowPollPicker(false)
				}).catch((err) => {
					const resErrors = err.response.data.errors

					var resError
					var newError = []

					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}

					// Show error message
					// newError.push(err.response.data.message)
					props.setErrors(newError)
				})
		})
	}

	// Function for deleting comments
	const onDeleteComment = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/karaoke-comments/${id}`)
				.then((res) => {
					props.setMessages([res.data])
					// Update karaoke comments
					axios.get(`${props.url}/api/karaoke-comments`)
						.then((res) => props.setKaraokeComments(res.data))
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
		const newKaraokeComments = props.karaokeComments
			.filter((item) => {
				// Get the exact karaoke and change like status
				if (item.id == comment) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new karaokes
		props.setKaraokeComments(newKaraokeComments)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/karaoke-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessages([res.data])
				// Update karaoke comments
				axios.get(`${props.url}/api/karaoke-comments`)
					.then((res) => props.setKaraokeComments(res.data))
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
			{/* Sliding Bottom Nav */}
			<div className={props.bottomMenu}>
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
							onClick={() => props.setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Comment Form */}
					<form
						onSubmit={onSubmit}
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
							{props.karaokeComments
								.filter((comment) => comment.karaoke_id == props.karaoke.id)
								.length > 0 ?
								props.karaokeComments
									.filter((comment) => comment.karaoke_id == props.karaoke.id)
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

export default KaraokeCommentSection