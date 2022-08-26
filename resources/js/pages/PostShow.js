import React, { useState, useEffect, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Img from '../components/Img'
import LoadingPostsMedia from '../components/LoadingPostsMedia'

const PostsMedia = React.lazy(() => import('../components/PostsMedia'))

import CloseSVG from '../svgs/CloseSVG'
import DecoSVG from '../svgs/DecoSVG'
import OptionsSVG from '../svgs/OptionsSVG'
import HeartSVG from '../svgs/HeartSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'

const PostShow = (props) => {

	axios.defaults.baseURL = props.url

	// Get id from URL
	const { id } = useParams();

	// Set states
	setTimeout(() => {
		props.setId(id)
		props.setPlaceholder("Add comment")
		props.setShowImage(false)
		props.setShowPoll(false)
		props.setShowImagePicker(false)
		props.setShowPollPicker(false)
		props.setUrlTo("/post-comments")
		props.setUrlToTwo("/posts")
		props.setStateToUpdate(() => setPostComments)
		props.setStateToUpdateTwo(() => props.setPosts)
		props.setEditing(false)
	}, 100)

	const [postComments, setPostComments] = useState(props.getLocalStorage("postComments"))
	const [bottomMenu, setBottomMenu] = useState("")
	const [commentToEdit, setCommentToEdit] = useState()
	const [userToUnfollow, setUserToUnfollow] = useState()
	const [postToEdit, setPostToEdit] = useState()
	const [editLink, setEditLink] = useState()
	const [deleteLink, setDeleteLink] = useState()
	const [commentDeleteLink, setCommentDeleteLink] = useState()
	const [unfollowLink, setUnfollowLink] = useState()

	// Fetch Post Comments
	useEffect(() => {
		axios.get(`/api/post-comments`)
			.then((res) => {
				setPostComments(res.data)
				props.setLocalStorage("postComments", res.data)
			}).catch(() => props.setErrors(['Failed to fetch post comments']))
	}, [])

	// Function for liking comments
	const onCommentLike = (comment) => {
		// Show like
		const newPostComments = postComments
			.filter((item) => {
				// Get the exact comment and change like status
				if (item.id == comment) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new comments
		setPostComments(newPostComments)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/post-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessages([res.data])
				// Update Post Comments
				axios.get(`${props.url}/api/post-comments`)
					.then((res) => setPostComments(res.data))
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

	// Function for deleting comments
	const onDeleteComment = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/post-comments/${id}`)
				.then((res) => {
					props.setMessages([res.data])
					// Update Post Comments
					axios.get(`${props.url}/api/post-comments`)
						.then((res) => setPostComments(res.data))
					// Update Posts
					axios.get(`${props.url}/api/posts`)
						.then((res) => props.setPosts(res.data))
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
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4">
					<div className="my-2 ml-2">
						<Link to="/">
							<svg
								width="2em"
								height="2em"
								viewBox="0 0 16 16"
								className="bi bi-arrow-left-short"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd"
									d="M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
								<path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
							</svg>
						</Link>
					</div>
					{props.posts
						.filter((post) => post.id == id)
						.map((post, key) => (
							<Suspense key={key} fallback={<LoadingPostsMedia />}>
								<PostsMedia
									{...props}
									post={post}
									setBottomMenu={setBottomMenu}
									setUserToUnfollow={setUserToUnfollow}
									setPostToEdit={setPostToEdit}
									setEditLink={setEditLink}
									setDeleteLink={setDeleteLink}
									setUnfollowLink={setUnfollowLink} />
							</Suspense>
						))}
					<div className="m-0 p-0">
						{postComments
							.filter((comment) => comment.post_id == id)
							.map((comment, index) => (
								<div key={index} className="d-flex">
									<div className="p-1">
										<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
											<Link to={`/home/${comment.user_id}`}>
												<Img
													src={comment.pp}
													width="50px"
													height="50px" />
											</Link>
										</div>
									</div>
									<div className="p-1 flex-grow-1">
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
												<small className="ml-1" style={{ color: "inherit" }}>{comment.decos}</small>
											</span>
											<small>
												<b><i className="float-right text-secondary mr-1">{comment.created_at}</i></b>
											</small>
										</h6>
										<p className="mb-0">{comment.text}</p>

										{/* Comment likes */}
										{comment.hasLiked ?
											<a
												href="#"
												style={{ color: "#fb3958" }}
												onClick={(e) => {
													e.preventDefault()
													onCommentLike(comment.id)
												}}>
												<HeartFilledSVG />
												<small className="ml-1" style={{ color: "inherit" }}>{comment.likes}</small>
											</a>
											: <a
												href='#'
												style={{ color: "rgba(220, 220, 220, 1)" }}
												onClick={(e) => {
													e.preventDefault()
													onCommentLike(comment.id)
												}}>
												<HeartSVG />
												<small className="ml-1" style={{ color: "inherit" }}>{comment.likes}</small>
											</a>}
										<small className="ml-1">{comment.comments}</small>

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
											<div className="dropdown-menu dropdown-menu-right"
												style={{ borderRadius: "0", backgroundColor: "#232323" }}>
												{comment.username == props.auth.username &&
													<a
														href="#"
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
							))}
					</div>
				</div>
				<div className="col-sm-4"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "1em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>
					{commentDeleteLink &&
						<div
							onClick={() => {
								setBottomMenu("")
								onDeleteComment(commentToEdit)
							}}>
							<h6 className="pb-2">Delete comment</h6>
						</div>}
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default PostShow
