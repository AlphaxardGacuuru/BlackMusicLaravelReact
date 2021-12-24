import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import SocialMediaInput from '../components/SocialMediaInput'
import Button from '../components/Button';

const Help = (props) => {

	// Declare states
	const [text, setText] = useState("")
	const [media, setMedia] = useState("")

	// Declare new FormData object for form data
	const formData = new FormData();

	// Handle form submit
	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("text", text);
		// If media has been selected then append the file to FormData object
		media && formData.append("media", media);

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/help-posts`, formData)
				.then((res) => {
					props.setMessage(res.data)
					// Updated Help Posts
					axios.get(`${props.url}/api/help-posts`)
						.then((res) => props.setHelpPosts(res.data))
						// Clear text
						setText("")
				}).catch(err => {
					const resErrors = err.response.data.errors

					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					newError.push(err.response.data.message)
					props.setErrors(newError)
				})
		})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="d-flex justify-content-between">
					{/* <!-- Close Icon --> */}
					<div className="">
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
				</div>

				{props
					.helpPosts
					// .filter((helpPost) => {
					// 	helpPost.username == props.auth.pp &&
					// 		helpPost.to == "@blackmusic" ||
					// 		helpPost.username == "@blackmusic" &&
					// 		helpPost.to == props.auth.pp
					// })
					.map((helpPost, key) => (
						<div key={key} className="d-flex flex-row-reverse">
							<div className="card rounded-0 p-2 m-1">
								{helpPost.text}
								<div className="d-flex flex-row-reverse">
									<div>
										<small className="text-muted"><i>{helpPost.created_at}</i></small>
									</div>
								</div>
							</div>
						</div>
					))}
				<form onSubmit={onSubmit} className="contact-form">
					<SocialMediaInput
						{...props}
						text={text}
						setText={setText}
						media={media}
						placeholder="Talk to us"
						setMedia={setMedia}
						placeholder="Add a comment"
						showImage={true}
						urlTo="/help-posts" />
				</form>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Help
