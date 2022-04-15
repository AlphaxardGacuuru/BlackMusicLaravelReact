import React, { Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SocialMediaInput = React.lazy(() => import('../components/SocialMediaInput'))

const PostCreate = (props) => {

	// Set states
	useEffect(() => {
		setTimeout(() => {
			props.setPlaceholder("What's on your mind")
			props.setShowImage(true)
			props.setShowPoll(true)
			props.setShowEmojiPicker(false)
			props.setShowImagePicker(false)
			props.setShowPollPicker(false)
			props.setUrlTo("/posts")
			props.setUrlToDelete(`/posts/${props.media.substr(11)}`)
			props.setStateToUpdate(() => props.setPosts)
		}, 1000)
	}, [])

	// Declare states
	// const [preview, setPreview] = useState()

	// Assign id to element
	// const mediaInput = React.useRef(null)

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

					{/* <div
							className="mb-2"
							style={{
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
								borderBottomRightRadius: "10px",
								borderBottomLeftRadius: "10px",
								overflow: "hidden"
							}}>
							<img
								src={preview}
								width="100%"
								height="auto" />
						</div> */}

					{/* Hidden file input */}
					{/* <input
							type='file'
							id='post-media'
							style={{ display: 'none' }}
							ref={mediaInput}
							onChange={onImageChange} /> */}

					{/* <div className="d-flex text-center">
							<div className="p-2 flex-fill"
								style={{
									backgroundColor: "#232323",
									display: mediaStyle
								}}
								onClick={() => {
									// mediaInput.current.click()
									setPollStyle("none")
								}}>
								<span style={{ color: "white" }}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-image" viewBox="0 0 16 16">
										<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
										<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
									</svg>
								</span>
							</div>
							<div className="p-2 flex-fill"
								style={{
									backgroundColor: "#232323",
									display: pollStyle
								}}
								onClick={() => {
									setDisplay1("inline")
									setMediaStyle("none")
								}}>
								<span style={{ color: "white" }}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-bar-chart"
										viewBox="0 0 16 16">
										<path
											d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
									</svg>
								</span>
							</div>
						</div> */}
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default PostCreate
