import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Img from '../components/Img'
import Button from '../components/Button'
import SocialMediaInput from '../components/SocialMediaInput'

const PostShow = (props) => {

	// Get id from URL
	const { id } = useParams();

	// Set states
	setTimeout(() => {
		props.setId(id)
		props.setPlaceholder("Add comment")
		props.setShowImage(false)
		props.setShowPoll(false)
		props.setUrlTo("/post-comments")
		props.setUrlToTwo("/posts")
		props.setStateToUpdate(() => props.setPostComments)
		props.setStateToUpdateTwo(() => props.setPosts)
	}, 1000)

	// Function for liking comments
	const onCommentLike = (comment) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/post-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessage(res.data)
				// Update Post Comments
				axios.get(`${props.url}/api/post-comments`)
					.then((res) => props.setPostComments(res.data))
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
					props.setMessage(res.data)
					// Update Post Comments
					axios.get(`${props.url}/api/post-comments`)
						.then((res) => props.setPostComments(res.data))
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
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="mt-2 ml-2">
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
				<div className="border border-top-0 m-0 p-0">
					{props.postComments
						.filter((comment) => comment.post_id == id)
						.map((comment, index) => (
							<div key={index} className={`media p-2 border-bottom`}>
								<div className='media-left'>
									<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
										<Link to={`/home/${comment.user_id}`}>
											<Img
												src={comment.pp}
												width="40px"
												height="40px" />
										</Link>
									</div>
								</div>
								<div className='media-body p-2'>
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
											<svg className="bi bi-circle"
												width="1em"
												height="1em"
												viewBox="0 0 16 16"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
											</svg>
										</span>
										<span className="ml-1" style={{ fontSize: "10px" }}>{comment.decos}</span>
										<small><i className="float-right mr-1">{comment.created_at}</i></small>
									</h6>
									<p className="mb-0">{comment.text}</p>

									{/* Comment likes */}
									{comment.hasLiked ?
										<a href="#" style={{ color: "#cc3300" }} onClick={(e) => {
											e.preventDefault()
											onCommentLike(comment.id)
										}}>
											<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
												className='bi bi-heart-fill' viewBox='0 0 16 16'>
												<path fillRule='evenodd'
													d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
											</svg>
											<small className="ml-1">{comment.likes}</small>
										</a>
										: <a href='#' onClick={(e) => {
											e.preventDefault()
											onCommentLike(comment.id)
										}}>
											<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
												className='bi bi-heart' viewBox='0 0 16 16'>
												<path
													d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
											</svg>
											<small className="ml-1">{comment.likes}</small>
										</a>}
									<small className="ml-1">{comment.comments}</small>

									{/* <!-- Default dropup button --> */}
									<div className="dropup float-right">
										<a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false">
											<svg className="bi bi-three-dots-vertical" width="1em" height="1em" viewBox="0 0 16 16"
												fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
											</svg>
										</a>
										<div className="dropdown-menu dropdown-menu-right p-0" style={{ borderRadius: "0" }}>
											{comment.user_id == props.auth.id &&
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
						))}
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default PostShow
