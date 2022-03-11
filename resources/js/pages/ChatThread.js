import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

import Img from '../components/Img'
import axios from '../components/Axios'

const ChatThread = (props) => {

	axios.defaults.baseURL = props.url

	let { username } = useParams()

	const [showDelete, setShowDelete] = useState()
	const [chat, setChat] = useState(props.getLocalStorage("chat"))
	const [chatThreads, setChatThreads] = useState(props.getLocalStorage("chatThreads"))

	useEffect(() => {
		// Fetch Chat Threads
		axios.get(`/api/chat/1`)
			.then((res) => {
				setChatThreads(res.data)
				props.setLocalStorage("chatThreads", res.data)
			}).catch(() => props.setErrors(['Failed to fetch chat']))

		// Fetch Chat
		axios.get(`/api/chat`)
			.then((res) => {
				setChat(res.data)
				props.setLocalStorage("chat", res.data)
			}).catch(() => props.setErrors(['Failed to fetch chat']))
	}, [])

	// Set states
	setTimeout(() => {
		props.setTo(username)
		props.setPlaceholder("Message")
		props.setShowImage(true)
		props.setShowPoll(false)
		props.setUrlTo("/chat")
		props.setUrlToDelete(`/chat/${props.media.substr(16)}`)
		props.setUrlToTwo(`/chat/1`)
		props.setStateToUpdate(() => setChat)
		props.setStateToUpdateTwo(() => setChatThreads)
	}, 1000)

	// Function for deleting chat
	const onDeleteChat = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/chat/${id}`)
				.then((res) => {
					props.setMessage(res.data)
					// Update chat
					axios.get(`${props.url}/api/chat`)
						.then((res) => setChat(res.data))
					// Update chat
					axios.get(`${props.url}/api/chat/1`)
						.then((res) => setChatThreads(res.data))
				}).catch((err) => {
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					// Get other errors
					// newError.push(err.response.data.message)
					props.setErrors(newError)
				})
		})
	}

	const onDeleteNotifications = (id) => {
		axios.delete(`/api/notifications/${id}`)
			.then((res) => {
				// Update Notifications
				axios.get(`/api/notifications`)
					.then((res) => props.setNotifications(res.data))
			})
	}

	// Function to Update Chat
	const checkChat = () => {
		axios.get(`/api/chat`)
			.then((res) => {
				// Get new length of chat
				var currentChatLength = chat
					.filter((chatItem) => {
						return chatItem.username == username &&
							chatItem.to == props.auth.username ||
							chatItem.username == props.auth.username &&
							chatItem.to == username
					}).length

				// Get old length of chat
				var newChatLength = res.data
					.filter((chatItem) => {
						return chatItem.username == username &&
							chatItem.to == props.auth.username ||
							chatItem.username == props.auth.username &&
							chatItem.to == username
					}).length

				// Update chat if new one arrives
				if (newChatLength > currentChatLength) {
					setChat(res.data)
					onDeleteNotifications(0)
					console.log("checking chat")
				}
			})
	}

	// Trigger function in intervals 
	useEffect(() => {
		const chatInterval = setInterval(() => checkChat(), 2000)

		return () => clearInterval(chatInterval)
	}, [])

	// Ensure latest chat is always visible
	useEffect(() => {
		// Scroll to the bottom of the page
		window.scrollTo(0, document.body.scrollHeight)
	}, [chat])

	// // Long hold to show delete button
	// var chatDiv = useRef(null)

	// if (chatDiv.current) {
	// 	chatDiv.current
	// 		.addEventListener("mousedown", () => {
	// 			const timeout = setTimeout(() => setShowDelete(!showDelete), 1000)

	// 			chatDiv.current
	// 				.addEventListener("mouseup", () => clearTimeout(timeout))
	// 		})

	// 	// For mobile
	// 	chatDiv.current
	// 		.addEventListener("touchstart", () => {
	// 			const timeout = setTimeout(() => setShowDelete(!showDelete), 1000)

	// 			chatDiv.current
	// 				.addEventListener("touchend", () => clearTimeout(timeout))
	// 		})
	// }

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
										<Link to="/chat">
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
												<h6 className="m-0"
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>
													<b className="text-white">
														{props.users.find((user) => user.username == username) &&
															props.users.find((user) => user.username == username).name}
													</b>
													<br />
													<small className="text-white">{username}</small>
												</h6>
											</center>
										</div>
									</div>

									<div className="menu-content-area d-flex align-items-center">
										<div>
											<Link to={`/profile/${username}`}>
												<Img
													src={props.users.find((user) => user.username == username) &&
														props.users.find((user) => user.username == username).pp}
													imgClass="rounded-circle"
													width="40px"
													height="40px" />
											</Link>
										</div>
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

				{/* <!-- ***** Call to Action Area Start ***** --> */}
				<div className="sonar-call-to-action-area section-padding-0-100">
					<div className="backEnd-content">
						<h2 className="p-2" style={{ color: "rgba(255,255,255,0.1)" }}>Chat</h2>
					</div>
					{chat
						.filter((chatItem) => {
							return chatItem.username == username &&
								chatItem.to == props.auth.username ||
								chatItem.username == props.auth.username &&
								chatItem.to == username
						}).map((chatItem, key) => (
							<div
								key={key}
								className={`d-flex ${chatItem.username == props.auth.username ? "flex-row-reverse" : "text-light"}`}>
								{chatItem.username == props.auth.username &&
									showDelete &&
									<div
										style={{
											cursor: "pointer",
											backgroundColor: chatItem.username == props.auth.username && "gold"
										}}
										className="rounded-0 my-1 mx-0 p-2"
										onClick={() => onDeleteChat(chatItem.id)}>
										<span style={{ color: "#232323" }}>
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
									className="rounded-0 border border-0 p-2 my-1 mx-0"
									style={{ backgroundColor: chatItem.username == props.auth.username ? "#FFD700" : "#232323" }}
									onClick={() => chatItem.username == props.auth.username && setShowDelete(!showDelete)}>
									{chatItem.text}

									{/* Show media */}
									<div className="mb-1" style={{ overflow: "hidden" }}>
										{chatItem.media &&
											<Img
												src={`storage/${chatItem.media}`}
												width="100%"
												height="auto"
												alt={'help-post-media'} />}
									</div>
									<small className={chatItem.username == props.auth.username ? "text-dark" : "text-muted"}>
										<i className="float-right">
											{chatItem.created_at}
										</i>
									</small>
								</div>
							</div>
						))}
				</div>
				<br />
				<br className="hidden" />
				<br className="hidden" />
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default ChatThread