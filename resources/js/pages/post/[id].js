import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "@/lib/axios"
import ssrAxios from "@/lib/ssrAxios"
import EchoConfig from "@/lib/echo"

import CommentMedia from "@/components/Core/CommentMedia"
import PostMedia from "@/components/Post/PostMedia"
import LoadingPostMedia from "@/components/Post/LoadingPostMedia"
import BackSVG from "@/svgs/BackSVG"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

const PostShow = (props) => {
	const router = useRouter()

	// Get id from URL
	const { id } = router.query

	const [post, setPost] = useState(props.post)
	const [postComments, setPostComments] = useState(props.comments)
	const [newPostComments, setNewPostComments] = useState()
	const [deletedIds, setDeletedIds] = useState([])

	useEffect(() => {
		// Instantiate Echo
		EchoConfig()

		Echo.private(`post-commented`).listen("PostCommentedEvent", (e) => {
			setNewPostComments(e.comment)
		})

		// Fetch Post
		id && props.get(`posts/${id}`, setPost)
		// Fetch Post Comments
		id && props.get(`post-comments/${id}`, setPostComments)
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
		axios
			.delete(`/api/posts/${id}`)
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
		axios
			.post(`/api/post-comment-likes`, { comment: comment })
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

		axios
			.delete(`/api/post-comments/${comment}`)
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
					<Link href="/">
						<a>
							<BackSVG />
						</a>
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

// This gets called on every request
export async function getServerSideProps(context) {
	const { id } = context.query

	var data = { post: {}, comments: {} }

	// Fetch Post Comments
	await ssrAxios.get(`/api/posts/${id}`).then((res) => (data.post = res.data.data))
	await ssrAxios
		.get(`/api/post-comments/${id}`)
		.then((res) => (data.comments = res.data.data))

	// Pass data to the page via props
	return { props: data }
}

export default PostShow
