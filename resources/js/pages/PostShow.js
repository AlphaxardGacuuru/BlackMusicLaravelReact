import React, { useState, useEffect, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import LoadingPostsMedia from '../components/LoadingPostsMedia'

const PostsMedia = React.lazy(() => import('../components/PostsMedia'))
const CommentsMedia = React.lazy(() => import('../components/CommentsMedia'))

import CloseSVG from '../svgs/CloseSVG'
import PostOptions from '../components/PostOptions'

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
	const [userToUnfollow, setUserToUnfollow] = useState()
	const [postToEdit, setPostToEdit] = useState()
	const [editLink, setEditLink] = useState()
	const [deleteLink, setDeleteLink] = useState()
	const [commentToEdit, setCommentToEdit] = useState()
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

	// Function for deleting posts
	const onDeletePost = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`/api/posts/${id}`).then((res) => {
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

	var dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

					<hr className="bg-dark" />

					<div className="m-0 p-0">
						{/* Loading Comment items */}
						{dummyArray
							.filter(() => postComments.length < 1)
							.map((item, key) => (<LoadingPostsMedia key={key} />))}

						{postComments
							.filter((comment) => comment.post_id == id)
							.map((comment, key) => (
								<Suspense key={key} fallback={<LoadingPostsMedia />}>
									<CommentsMedia
										{...props}
										comment={comment}
										setBottomMenu={setBottomMenu}
										setCommentDeleteLink={setCommentDeleteLink}
										setCommentToEdit={setCommentToEdit}
										onCommentLike={onCommentLike}
										onDeleteComment={onDeleteComment} />
								</Suspense>
							))}
					</div>
				</div>
				<div className="col-sm-4"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<PostOptions
				{...props}
				bottomMenu={bottomMenu}
				setBottomMenu={setBottomMenu}
				unfollowLink={unfollowLink}
				userToUnfollow={userToUnfollow}
				editLink={editLink}
				postToEdit={postToEdit}
				deleteLink={deleteLink}
				onDeletePost={onDeletePost}
				commentToEdit={commentToEdit}
				commentDeleteLink={commentDeleteLink}
				onDeleteComment={onDeleteComment} />
			{/* Sliding Bottom Nav end */}
		</>
	)
}

export default PostShow
