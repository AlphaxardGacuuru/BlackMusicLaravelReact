import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
// import Axios from "axios"
// import Echo from "Echo"

import Img from "@/components/Core/Img"

import TrashSVG from "@/svgs/TrashSVG"
import BackSVG from "@/svgs/BackSVG"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

const ChatThread = (props) => {
	console.log("chat/username")
	let { username } = useParams()

	const [chats, setChats] = useState([])
	const [user, setUser] = useState({})
	const [newChat, setNewChat] = useState({})
	const [toDeleteIds, setToDeleteIds] = useState([])
	const [deletedIds, setDeletedIds] = useState([])
	const [isOnline, setIsOnline] = useState(false)

	useEffect(() => {
		// Listen to New Chats
		Echo.private(`chat-created`).listen("NewChatEvent", (e) => {
			setNewChat({ ...e.chat, createdAt: e.chat.created_at })
		})

		// Listen to Deleted Chats
		Echo.private(`chat-deleted`).listen("ChatDeletedEvent", (e) => {
			props.get(`chats/${username}`, setChats)
		})

		// Join Presence Channel
		Echo.join(`chat`)
			.here((users) => {
				console.log(users)
				// var isHere = users.find((user) => user.username == username)
				// isHere && setIsOnline(true)
			})
			.joining((user) => {
				console.log(user.username + " joined.")
			})
			.leaving((user) => {
				console.log(user.username + " left.")
			})
			.listenForWhisper("typing", (e) => {
				console.log(e.name + " is typing...")
			})
			.error((error) => {
				console.error(error)
			})

		// Fetch Chat
		props.get(`chats/${username}`, setChats)
		// Fetch User
		username && props.get(`users/${username}`, setUser)

		return () => {
			Echo.leave("chat-created")
			Echo.leave("chat-deleted")
			Echo.leave("chat")
		}
	}, [username])

	/*
	 * Show new chats */
	useEffect(() => {
		// Remove duplicate
		var cleanChats = chats.filter((chat) => chat.id != newChat.id)
		// Set new chats
		setChats([...cleanChats, newChat])
	}, [newChat])

	/*
	 * Show Delete */
	const showDelete = (id) => {
		if (toDeleteIds.includes(id)) {
			var newToDeleteIds = toDeleteIds.filter((toDeleteId) => toDeleteId != id)
			setToDeleteIds(newToDeleteIds)
		} else {
			setToDeleteIds([...toDeleteIds, id])
		}
	}

	/*
	 * Function for deleting chat */
	const onDeleteChat = (id) => {
		// Remove item
		setDeletedIds([...deletedIds, id])

		Axios.delete(`/api/chats/${id}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Send Typing Event */
	const onType = () => {
		console.log("typing...")
		Echo.join(`chat`).whisper("typing", {
			name: props.auth.username,
		})
	}

	// Ensure latest chat is always visible
	useEffect(() => {
		// Scroll to the bottom of the page
		window.scrollTo(0, document.body.scrollHeight)
	}, [chats])

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* <!-- ***** Header Area Start ***** --> */}
				<header
					style={{ backgroundColor: "#232323" }}
					className="header-area">
					<div className="container-fluid p-0">
						<div className="row">
							<div
								className="col-12"
								style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									{/* <!-- Logo Area  --> */}
									<div className="logo-area">
										<Link
											to="/chat"
											className="fs-6">
											<BackSVG />
										</Link>
									</div>

									{/* User info */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="text-white">
											<center>
												<h6
													className="m-0"
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip",
													}}>
													<b className="text-white">{user.name}</b>
													<br />
													<div className="pt-1">
														{isOnline && (
															<small className="text-white bg-success px-2 rounded-pill">
																online
															</small>
														)}
													</div>
												</h6>
											</center>
										</div>
									</div>

									<div className="menu-content-area d-flex align-items-center">
										<div>
											<Link to={`/profile/show/${username}`}>
												<Img
													src={user.avatar}
													className="rounded-circle"
													width="40px"
													height="40px"
												/>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				{/* <!-- ***** Header Area End ***** --> */}
				<br />
				<br />
				<br />
				<br className="hidden" />

				{/* <!-- ***** Chats ***** --> */}
				<div className="sonar-call-to-action-area section-padding-0-100">
					<div className="backEnd-content">
						<h2
							className="p-2"
							style={{ color: "rgba(255,255,255,0.1)" }}>
							Chat
						</h2>
					</div>
					{chats
						.filter((chat) => chat != {})
						.filter((chat) => !deletedIds.includes(chat.id))
						.map((chatItem, key) => (
							<div
								key={key}
								className={`d-flex
								${
									chatItem.username == props.auth.username
										? "flex-row-reverse"
										: "text-light"
								}`}>
								{/* Trash */}
								{chatItem.username == props.auth.username &&
									toDeleteIds.includes(chatItem.id) && (
										<div
											style={{
												cursor: "pointer",
												backgroundColor:
													chatItem.username == props.auth.username && "gold",
											}}
											className="rounded-0 border border-secondary border-right-0 border-top-0 border-bottom-0 p-2 my-1 mx-0"
											onClick={() => onDeleteChat(chatItem.id)}>
											<span style={{ color: "#232323" }}>
												<TrashSVG />
											</span>
										</div>
									)}
								{/* Trash End */}

								{/* Chat */}
								<div
									className="rounded-0 border-0 p-2 my-1 m-0 pb-0"
									style={{
										backgroundColor:
											chatItem.username == props.auth.username
												? "#FFD700"
												: "#232323",
										maxWidth: "90%",
										wordWrap: "break-word",
										cursor: "pointer",
									}}
									onClick={() => {
										if (chatItem.username == props.auth.username) {
											showDelete(chatItem.id)
										}
									}}>
									{chatItem.text}

									{/* Media */}
									<div
										className="mb-1"
										style={{ overflow: "hidden" }}>
										{chatItem.media && (
											<Img
												src={chatItem.media}
												width="100%"
												height="auto"
												alt={"chat-media"}
											/>
										)}
									</div>
									{/* Media End */}

									{/* Created At */}
									<small
										className={
											chatItem.username == props.auth.username
												? "text-dark m-0 p-1"
												: "text-muted m-0 p-1"
										}>
										<i
											style={{ fontSize: "0.8em" }}
											className="float-end m-0 p-0">
											{chatItem.createdAt}
										</i>
									</small>
									{/* Created At End */}
								</div>
								{/* Chat End */}
							</div>
						))}
				</div>
				<br />
				<br className="hidden" />
				<br className="hidden" />
				{/* Social Media Input */}
				<div className="bottomNav">
					<SocialMediaInput
						{...props}
						to={username}
						placeholder="Message"
						showImage={true}
						showPoll={false}
						urlTo="chats"
						editing={false}
					/>
				</div>
				{/* Social Media Input End */}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default ChatThread
