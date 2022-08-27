import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Img from '../components/Img'

import DecoSVG from '../svgs/DecoSVG'
import OptionsSVG from '../svgs/OptionsSVG'
import HeartSVG from '../svgs/HeartSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'

const CommentsMedia = (props) => {

	// Function for liking comments
	const onCommentLike = (comment) => {
		// Show like
		const newPostComments = props.postComments
			.filter((item) => {
				// Get the exact comment and change like status
				if (item.id == comment) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new comments
		props.setPostComments(newPostComments)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/post-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessages([res.data])
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

	return (
		<div className="d-flex">
			<div className="p-1">
				<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
					<Link to={`/home/${props.comment.user_id}`}>
						<Img
							src={props.comment.pp}
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
					<b>{props.comment.name}</b>
					<small>{props.comment.username}</small>
					<span className="ml-1" style={{ color: "gold" }}>
						<DecoSVG />
						<small
							className="ml-1"
							style={{ color: "inherit" }}>{
								props.comment.decos}
						</small>
					</span>
					<small>
						<b><i className="float-right text-secondary mr-1">{props.comment.created_at}</i></b>
					</small>
				</h6>
				<p className="mb-0">{props.comment.text}</p>

				{/* Comment likes */}
				{props.comment.hasLiked ?
					<a
						href="#"
						style={{ color: "#fb3958" }}
						onClick={(e) => {
							e.preventDefault()
							onCommentLike(props.comment.id)
						}}>
						<HeartFilledSVG />
						<small
							className="ml-1"
							style={{ color: "inherit" }}>
							{props.comment.likes}
						</small>
					</a>
					: <a
						href='#'
						style={{ color: "rgba(220, 220, 220, 1)" }}
						onClick={(e) => {
							e.preventDefault()
							onCommentLike(props.comment.id)
						}}>
						<HeartSVG />
						<small
							className="ml-1"
							style={{ color: "inherit" }}>
							{props.comment.likes}
						</small>
					</a>}
				<small className="ml-1">{props.comment.comments}</small>

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
						{props.comment.username == props.auth.username &&
							<a
								href="#"
								className="dropdown-item"
								onClick={(e) => {
									e.preventDefault();
									props.onDeleteComment(props.comment.id)
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
							if (props.comment.username == props.auth.username) {
								props.setBottomMenu("menu-open")
								props.setCommentToEdit(props.comment.id)
								// Show and Hide elements
								props.setCommentDeleteLink(true)
							}
						}}>
						<OptionsSVG />
					</span>
				</div>
			</div>
		</div>
	)
}

export default CommentsMedia