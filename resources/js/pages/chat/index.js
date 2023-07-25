import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Img from "@/components/Core/Img"

import ChatSVG from "@/svgs/ChatSVG"
import ImageSVG from "@/svgs/ImageSVG"
// import Echo from "Echo"

const Chat = (props) => {
	const [blackMusic, setBlackMusic] = useState({})
	const [chatThreads, setChatThreads] = useState([])

	// Fetch Help Threads
	useEffect(() => {
		// Listen to New Chats
		Echo.private(`chat-created`).listen("NewChatEvent", (e) => {
			props.get("chats", setChatThreads, "chatThreads")
		})

		// Listen to Deleted Chats
		Echo.private(`chat-deleted`).listen("ChatDeletedEvent", (e) => {
			props.get("chats", setChatThreads, "chatThreads")
		})

		props.get("users/@blackmusic", setBlackMusic)
		props.get("chats", setChatThreads, "chatThreads")

		return () => {
			Echo.leaveChannel(`chat-created`)
			Echo.leaveChannel(`chat-deleted`)
		}
	}, [])

	var raise =
		props.audioStates.show.id != 0 && props.audioStates.show.id != undefined

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* Chat button */}
				<Link
					to="/chat/new"
					id="chatFloatBtn"
					className={raise ? "mb-5" : undefined}>
					<ChatSVG />
				</Link>

				{/* Default Thread */}
				{chatThreads.length == 0 && (
					<div className="d-flex">
						<div className="p-2">
							<Link to="/chat/show/@blackmusic">
								<Img
									src={blackMusic.avatar}
									className="rounded-circle"
									width="50px"
									height="50px"
								/>
							</Link>
						</div>
						<div className="p-2 flex-grow-1">
							<Link to="/chat/show/@blackmusic">
								<h6
									className="m-0"
									style={{
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip",
									}}>
									<b>Black Music</b>
									<small>@blackmusic</small>
								</h6>
								<p className="mb-0">Need help? Start a conversation.</p>
							</Link>
						</div>
					</div>
				)}
				{/* Start Thread End */}

				{/* Threads Start */}
				{chatThreads.map((chatThread, key) => (
					<div
						key={key}
						className="d-flex">
						<div className="pt-2">
							<Link to={`/chat/show/${chatThread.username}`}>
								<Img
									src={chatThread.avatar}
									className="rounded-circle"
									width="50px"
									height="50px"
								/>
							</Link>
						</div>
						<div
							className="p-2"
							style={{
								maxWidth: "75%",
								wordWrap: "break-word",
							}}>
							<Link to={`/chat/show/${chatThread.username}`}>
								<h6
									className="m-0"
									style={{
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip",
									}}>
									<b>{chatThread.name}</b>
									<small>{chatThread.username}</small>
								</h6>
								<p
									className="m-0"
									style={{
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip",
									}}>
									{chatThread.text}
									{chatThread.hasMedia && (
										<span
											className="ms-1"
											style={{ cursor: "pointer" }}>
											<ImageSVG />
										</span>
									)}
								</p>
							</Link>
						</div>
						<div className="py-2 flex-grow-1">
							<small>
								<i
									style={{
										whiteSpace: "nowrap",
										fontSize: "0.8em",
									}}
									className="float-end mr-1 text-secondary">
									{chatThread.createdAt}
								</i>
							</small>
						</div>
					</div>
				))}
				{/* Threads End */}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Chat
