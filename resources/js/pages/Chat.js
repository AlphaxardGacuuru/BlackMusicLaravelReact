import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'

const Chat = (props) => {

	axios.defaults.baseURL = props.url

	const [chatThreads, setChatThreads] = useState(props.getLocalStorage("chatThreads"))

	// Fetch Help Threads
	useEffect(() => {
		axios.get(`/api/chat/1`)
			.then((res) => {
				setChatThreads(res.data)
				props.setLocalStorage("chatThreads", res.data)
			}).catch(() => props.setErrors(['Failed to fetch chat threads']))
	}, [])

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">

				{/* Chat button */}
				<Link to="/new-chat" id="chatFloatBtn">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="bi bi-chat-right-text"
						viewBox="0 0 16 16">
						<path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
						<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
					</svg>
				</Link>

				{/* Start Thread */}
				{chatThreads.length == 0 &&
					<div className="d-flex">
						<div className="p-2">
							<Link to="/profile/@blackmusic">
								<Img
									src={props.users.find((user) => user.username == "@blackmusic") &&
										props.users.find((user) => user.username == "@blackmusic").pp}
									imgClass="rounded-circle"
									width="50px"
									height="50px" />
							</Link>
						</div>
						<div className="p-2 flex-grow-1">
							<Link to="/chat/@blackmusic">
								<h6
									className="m-0"
									style={{
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									<b>Black Music</b>
									<small>@blackmusic</small>
								</h6>
								<p className="mb-0">Start a conversation</p>
							</Link>
						</div>
					</div>}
				{/* Start Thread End */}

				{/* Threads Start */}
				{chatThreads
					.map((chatThread, key) => (
						<div key={key} className="d-flex">
							<div className="p-1">
								<Link to={`/profile/${chatThread.username}`}>
									<Img
										src={chatThread.pp}
										imgClass="rounded-circle"
										width="50px"
										height="50px" />
								</Link>
							</div>
							<div className="p-2 flex-grow-1">
								<Link to={`/chat/${chatThread.link}`}>
									<h6
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
										<b>{chatThread.name}</b>
										<small>{chatThread.username}</small>
									</h6>
									<p className="mb-0">{chatThread.text}
										{chatThread.hasMedia &&
											<span className="ml-1" style={{ cursor: "pointer" }}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="15"
													height="15"
													fill="currentColor"
													className="bi bi-image"
													viewBox="0 0 16 16">
													<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
													<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
												</svg>
											</span>}
									</p>
								</Link>
							</div>
							<div className="p-1">
								<small>
									<i className="float-right mr-1">{chatThread.created_at}</i>
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