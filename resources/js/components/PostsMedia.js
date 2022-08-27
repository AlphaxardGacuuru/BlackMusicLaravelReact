import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Img from '../components/Img'
import Polls from '../components/Polls'

import DecoSVG from '../svgs/DecoSVG'
import OptionsSVG from '../svgs/OptionsSVG'
import CommentSVG from '../svgs/CommentSVG'
import HeartSVG from '../svgs/HeartSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import ShareSVG from '../svgs/ShareSVG'

const PostsMedia = (props) => {

	// Function for liking posts
	const onPostLike = (post) => {
		// Show like
		const newPosts = props.posts
			.filter((item) => {
				// Get the exact post and change like status
				if (item.id == post) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new posts
		props.setPosts(newPosts)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`/api/post-likes`, {
				post: post
			}).then((res) => {
				props.setMessages([res.data])
				// Update posts
				axios.get(`/api/posts`)
					.then((res) => props.setPosts(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				props.setErrors(newError)
			})
		})
	}

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = (post) => {
		// Define share data
		const shareData = {
			title: post.text,
			text: `Check out this post on Black Music\n`,
			url: `https://music.black.co.ke/#/post-show/${post.id}`
		}
		// Check if data is shareble
		navigator.canShare(shareData) &&
			navigator.share(shareData)
	}

	return (
		<div className="d-flex">
			<div className="p-1">
				<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
					<Link to={`/profile/${props.post.username}`}>
						<Img src={props.post.pp}
							width="50px"
							height="50px"
							alt={'avatar'} />
					</Link>
				</div>
			</div>
			<div className="p-1 flex-grow-1">
				<h6 className="m-0"
					style={{
						width: "100%",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "clip"
					}}>
					<b>{props.post.name}</b>
					<small>{props.post.username}</small>
					<span className="ml-1" style={{ color: "gold" }}>
						<DecoSVG />
						<small className="ml-1" style={{ color: "inherit" }}>{props.post.decos}</small>
					</span>
					<small><b><i className="float-right text-secondary mr-1">{props.post.created_at}</i></b></small>
				</h6>
				<Link to={"post-show/" + props.post.id}>
					<p className="mb-0">{props.post.text}</p>
				</Link>

				{/* Show media */}
				<div className="mb-1" style={{ overflow: "hidden" }}>
					{props.post.media &&
						<Img
							src={`storage/${props.post.media}`}
							width="100%"
							height="auto"
							alt={'post-media'} />}
				</div>

				{/* Polls */}
				<Polls {...props} post={props.post} />
				{/* Polls End */}

				{/* Post likes */}
				{props.post.hasLiked ?
					<a href="#"
						style={{ color: "#fb3958" }}
						onClick={(e) => {
							e.preventDefault()
							onPostLike(props.post.id)
						}}>
						<span style={{ color: "inherit", fontSize: "1.2em" }}><HeartFilledSVG /></span>
						<small className="ml-1" style={{ color: "inherit" }}>{props.post.likes}</small>
					</a> :
					<a
						href="#"
						style={{ color: "rgba(220, 220, 220, 1)" }}
						onClick={(e) => {
							e.preventDefault()
							onPostLike(props.post.id)
						}}>
						<span style={{ color: "inherit", fontSize: "1.2em" }}><HeartSVG /></span>
						<small className="ml-1" style={{ color: "inherit" }}>{props.post.likes}</small>
					</a>}

				{/* Post comments */}
				<Link to={"/post-show/" + props.post.id} style={{ color: "rgba(220, 220, 220, 1)" }}>
					<span className="ml-5" style={{ fontSize: "1.2em" }}><CommentSVG /></span>
					<small className="ml-1" style={{ color: "inherit" }}>{props.post.comments}</small>
				</Link>

				{/* Share Post */}
				<span
					className="ml-5"
					style={{ fontSize: "1.3em", color: "rgba(220, 220, 220, 1)" }}
					onClick={() => onShare(props.post)}>
					<ShareSVG />
				</span>

				{/* <!-- Default dropup button --> */}
				<div className="dropup float-right hidden">
					<a href="#"
						role="button"
						id="dropdownMenuLink"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
						<OptionsSVG />
					</a>
					<div className="dropdown-menu dropdown-menu-right"
						style={{ borderRadius: "0", backgroundColor: "#232323" }}>
						{props.post.username != props.auth.username ?
							props.post.username != "@blackmusic" &&
							<a href="#" className="dropdown-item" onClick={(e) => {
								e.preventDefault()
								props.onFollow(props.post.username)
							}}>
								<h6>
									{props.post.hasFollowed ?
										`Unfollow ${props.post.username}` :
										`Follow ${props.post.username}`}
								</h6>
							</a> :
							<span>
								<Link
									to={`/post-edit/${props.post.id}`}
									className="dropdown-item">
									<h6>Edit post</h6>
								</Link>
								<a
									href="#"
									className="dropdown-item"
									onClick={(e) => {
										e.preventDefault();
										props.onDeletePost(props.post.id)
									}}>
									<h6>Delete post</h6>
								</a>
							</span>}
					</div>
				</div>
				{/* For small screens */}
				<div className="float-right anti-hidden">
					<span
						className="text-secondary"
						onClick={() => {
							if (props.post.username != props.auth.username) {
								if (props.post.username != "@blackmusic") {
									props.setBottomMenu("menu-open")
									props.setUserToUnfollow(props.post.username)
									// Show and Hide elements
									props.setUnfollowLink(true)
									props.setDeleteLink(false)
									props.setEditLink(false)
								}
							} else {
								props.setBottomMenu("menu-open")
								props.setPostToEdit(props.post.id)
								// Show and Hide elements
								props.setEditLink(true)
								props.setDeleteLink(true)
								props.setUnfollowLink(false)
							}
						}}>
						<OptionsSVG />
					</span>
				</div>
				{/* Edited */}
				<small>
					<b><i className="d-block text-secondary my-1">{props.post.hasEdited && "Edited"}</i></b>
				</small>
			</div>
		</div>
	)
}

export default PostsMedia