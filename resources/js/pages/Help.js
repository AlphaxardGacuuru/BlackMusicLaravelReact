import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'

const Help = (props) => {

	var threadsArray = []

	props.helpPosts
		.forEach((helpPost) => {
			// Populate threads array
			if (!threadsArray.some((username) => username == helpPost.username) && helpPost.username != "@blackmusic") {
				// Add item if it doesn't exist
				threadsArray.push(helpPost.username)
			}
		})

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{threadsArray
					.map((thread, key) => (
						<div key={key}>
							{props.helpPosts
								.filter((helpPost) => helpPost.username == thread)
								.slice(0, 1)
								.map((helpPost, key) => (
									<div key={key} className={`d-flex border-bottom ${key == 0 && "border-top"}`}>
										<div className="p-2">
											<Link to={`/profile/${helpPost.username}`}>
												<Img
													src={helpPost.pp}
													imgClass="rounded-circle"
													width="50px"
													height="50px" />
											</Link>
										</div>
										<div className="p-2 flex-grow-1">
											<Link to={`/help/${helpPost.username}`}>
												<h6
													className="m-0"
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>
													<b>{helpPost.name}</b>
													<small>{helpPost.username}</small>
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
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Help