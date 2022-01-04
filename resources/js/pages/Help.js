import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Img from '../components/Img'

const Help = (props) => {

	var threadsArray = []

	props.helpPosts
		.filter((helpPost) => {
			return helpPost.username == props.auth.username ||
				helpPost.to == props.auth.username
		}).forEach((helpPost) => {
			// Populate threads array
			if (!threadsArray.some((username) => username == helpPost.to)) {
				// Add item if it doesn't exist
				threadsArray.push(helpPost.to)
			}
		})

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* Start Thread */}
				{threadsArray.length == 0 &&
					<div className="d-flex border-bottom">
						<div className="p-2">
							<Link to="/profile/@blackmusic">
								<Img
									imgClass="rounded-circle"
									width="50px"
									height="50px" />
							</Link>
						</div>
						<div className="p-2 flex-grow-1">
							<Link to="/help/@blackmusic">
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
				{threadsArray
					.map((thread, key) => (
						<div key={key}>
							{props.helpPosts
								.filter((helpPost) => {
									return helpPost.username == thread &&
										helpPost.to == props.auth.username ||
										helpPost.username == props.auth.username &&
										helpPost.to == thread
								}).reverse()
								.slice(0, 1)
								.map((helpPost, key) => (
									<div key={key} className={`d-flex border-bottom ${key == 0 && "border-top"}`}>
										<div className="p-2">
											<Link to={thread != "@blackmusic" ? `/profile/${thread}` : "/help"}>
												<Img
													src={props.users.find((user) => user.username == thread) &&
														props.users.find((user) => user.username == thread).pp}
													imgClass="rounded-circle"
													width="50px"
													height="50px" />
											</Link>
										</div>
										<div className="p-2 flex-grow-1">
											<Link to={`/help/${thread}`}>
												<h6
													className="m-0"
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>
													<b>{props.users.find((user) => user.username == thread) &&
														props.users.find((user) => user.username == thread).name}</b>
													<small>{thread}</small>
												</h6>
												<p className="mb-0">{helpPost.text}</p>
											</Link>
										</div>
										<div className="p-2">
											<small>
												<i className="float-right mr-1">{helpPost.created_at.substr(11)}</i>
											</small>
										</div>
									</div>
								))}
						</div>
					))}
				{/* Threads End */}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Help