import React, { Suspense, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const SocialMediaInput = React.lazy(() => import('../components/SocialMediaInput'))

const PostEdit = (props) => {

	let { id } = useParams()

	var postToEdit = []

	// Fetch post
	if (props.posts) {
		var postToEdit = props.posts
			.find((post) => post.id == id)
	}

	// Set states
	useEffect(() => {
		setTimeout(() => {
			props.setPlaceholder("What's on your mind")
			props.setText(postToEdit.text)
			props.setShowImage(false)
			props.setShowPoll(false)
			props.setShowEmojiPicker(false)
			props.setShowImagePicker(false)
			props.setShowPollPicker(false)
			props.setUrlTo(`/posts/${id}`)
			props.setUrlToDelete(`/posts/${props.media.substr(11)}`)
			props.setUrlToTwo(`/posts`)
			props.setStateToUpdate(() => props.setPosts)
			props.setStateToUpdateTwo(() => props.setPosts)
			props.setEditing(true)
		}, 1000)
	}, [])
	
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="contact-form">
					<div className="d-flex justify-content-between mb-1">
						{/* <!-- Close Icon --> */}
						<div className="">
							<Link to="/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									fill="currentColor"
									className="bi bi-x"
									viewBox="0 0 16 16">
									<path
										d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</Link>
						</div>
					</div>

					{/* Social Input */}
					<form
						onSubmit={props.onSubmit}
						className="contact-form bg-white"
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
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default PostEdit
