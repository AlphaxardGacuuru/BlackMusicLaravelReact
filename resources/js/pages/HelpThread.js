import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Img from '../components/Img'

const HelpThread = (props) => {

	let { username } = useParams()

	const [showDelete, setShowDelete] = useState()

	// Set states
	setTimeout(() => {
		props.setTo(username)
		props.setPlaceholder("Talk to us")
		props.setShowImage(true)
		props.setShowPoll(false)
		props.setUrlTo("/help-posts")
		props.setUrlToDelete(`/help-posts/${props.media.substr(16)}`)
		props.setStateToUpdate(() => props.setHelpPosts)
	}, 1000)

	// Scroll to the bottom of the page
	// window.scrollTo(0, document.body.scrollHeight)

	// Function for deleting posts
	const onDeletePost = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/help-posts/${id}`)
				.then((res) => {
					props.setMessage(res.data)
					// Update posts
					axios.get(`${props.url}/api/help-posts`)
						.then((res) => props.setHelpPosts(res.data))
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

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* <!-- ***** Header Area Start ***** --> */}
				<header style={{ backgroundColor: "#232323" }} className="header-area">
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12" style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									{/* <!-- Logo Area  --> */}
									<div className="logo-area">
										<Link to="/help">
											<svg
												width="30"
												height="30"
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

									{/* User info */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="text-white">
											<center>
												{props.auth.username == "@blackmusic" ?
													<h6 className="m-0"
														style={{
															width: "100%",
															whiteSpace: "nowrap",
															overflow: "hidden",
															textOverflow: "clip"
														}}><b className="text-white">
															{props.users.find((user) => user.username == username) &&
																props.users.find((user) => user.username == username).name}
														</b>
														<br />
														<small className="text-white">{username}</small>
													</h6> :
													<h6 className="m-0"
														style={{
															width: "100%",
															whiteSpace: "nowrap",
															overflow: "hidden",
															textOverflow: "clip"
														}}>
														<b className="text-white">Black Music</b>
														<br />
														<small className="text-white">@blackmusic</small>
													</h6>}
											</center>
										</div>
									</div>

									<div className="menu-content-area d-flex align-items-center">
										<div></div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</header>
				<br />
				<br />
				<br />
				<br className="hidden" />

				<div className="d-flex justify-content-between">
					{/* <!-- Back Icon --> */}
					<div className="">
					</div>
				</div>

				{props
					.helpPosts
					.filter((helpPost) => {
						return helpPost.username == username &&
							helpPost.to == props.auth.username ||
							helpPost.username == props.auth.username &&
							helpPost.to == username
					}).map((helpPost, key) => (
						<div
							key={key}
							className={`d-flex ${helpPost.username == props.auth.username && "flex-row-reverse text-white"}`}>
							{helpPost.username == props.auth.username &&
								showDelete &&
								<div
									style={{ backgroundColor: helpPost.username == props.auth.username && "#232323" }}
									className="card rounded-0 my-1 mx-0 p-2"
									onClick={() => onDeletePost(helpPost.id)}>
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-trash"
											viewBox="0 0 16 16">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
											<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
										</svg>
									</span>
								</div>}
							<div
								className="card rounded-0 border border-0 p-2 my-1 mx-0"
								style={{ backgroundColor: helpPost.username == props.auth.username && "#232323" }}
								onClick={() => helpPost.username == props.auth.username && setShowDelete(!showDelete)}>
								{helpPost.text}

								{/* Show media */}
								<div className="mb-1" style={{ overflow: "hidden" }}>
									{helpPost.media &&
										<Img
											src={`storage/${helpPost.media}`}
											width="100%"
											height="auto"
											alt={'help-post-media'} />}
								</div>
								<small className="text-muted">
									<i className="float-right">
										{helpPost.created_at}
									</i>
								</small>
							</div>
						</div>
					))}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default HelpThread