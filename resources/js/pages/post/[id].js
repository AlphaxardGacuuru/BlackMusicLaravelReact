import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
// import Axios from "axios"

// import Echo from "Echo"

import CommentMedia from "@/components/Core/CommentMedia"
import PostMedia from "@/components/Post/PostMedia"
import LoadingPostMedia from "@/components/Post/LoadingPostMedia"
import BackSVG from "@/svgs/BackSVG"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

const PostShow = (props) => {
	const router = useHistory()

	// Get id from URL
	const { id } = useParams()

	const [post, setPost] = useState({})
	const [postComments, setPostComments] = useState([])
	const [newPostComments, setNewPostComments] = useState()
	const [deletedIds, setDeletedIds] = useState([])

	useEffect(() => {
		Echo.private(`post-commented`).listen("PostCommentedEvent", (e) => {
			setNewPostComments(e.comment)
		})

		// Fetch Post
		props.get(`posts/${id}`, setPost)
		// Fetch Post Comments
		props.get(`post-comments/${id}`, setPostComments)
	}, [id])

	/*
	 * Function for deleting posts */
	const onNewComments = () => {
		props.get(`post-comments/${id}`, setPostComments)
		// Smooth scroll to top
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
		setNewPostComments()
	}

	/*
	 * Function for deleting posts */
	const onDeletePost = (id) => {
		Axios.delete(`/api/posts/${id}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Redirect to home
				router.push("/")
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for liking comments */
	const onCommentLike = (comment) => {
		// Add like to database
		Axios.post(`/api/post-comment-likes`, { comment: comment })
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Post Comments to update like counter
				props.get(`post-comments/${id}`, setPostComments)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for deleting comments */
	const onDeleteComment = (comment) => {
		// Remove comment
		setDeletedIds([...deletedIds, comment])

		Axios.delete(`/api/post-comments/${comment}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	var dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<div className="row">
			<center>
				<h6
					id="snackbar-up"
					style={{ cursor: "pointer" }}
					className={newPostComments && "show"}
					onClick={onNewComments}>
					<div>New Comments</div>
				</h6>
			</center>
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="d-flex my-2">
					<Link to="/">
						<BackSVG />
					</Link>
					<h1 className="mx-auto">Post</h1>
					<a className="invisible">
						<BackSVG />
					</a>
				</div>
				<span>
					<PostMedia
						{...props}
						post={post}
						onDeletePost={onDeletePost}
						stateToUpdate={() => {
							props.get(`posts/${id}`, setPost)
						}}
					/>
				</span>

				<hr className="text-white" />

				<div className="m-0 p-0">
					{/* Loading Comment items */}
					{dummyArray
						.filter(() => postComments.length < 1)
						.map((item, key) => (
							<LoadingPostMedia key={key} />
						))}

					{postComments
						.filter((comment) => !deletedIds.includes(comment.id))
						.map((comment, key) => (
							<CommentMedia
								{...props}
								key={key}
								comment={comment}
								onCommentLike={onCommentLike}
								onDeleteComment={onDeleteComment}
							/>
						))}
				</div>

				{/* Social Media Input */}
				<div className="bottomNav">
					<SocialMediaInput
						{...props}
						id={id}
						placeholder="Add comment"
						showImage={false}
						showPoll={false}
						urlTo="post-comments"
						stateToUpdate={() => {
							props.get(`post-comments/${id}`, setPostComments)
						}}
						editing={false}
					/>
				</div>
				{/* Social Media Input End */}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default PostShow
