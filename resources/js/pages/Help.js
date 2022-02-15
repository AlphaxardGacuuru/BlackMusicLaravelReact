import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'

const Help = (props) => {

	axios.defaults.baseURL = props.url

	const [helpThreads, setHelpThreads] = useState(props.getLocalStorage("helpThreads"))

	// Fetch Help Threads
	useEffect(() => {
		axios.get(`/api/help-posts/1`)
			.then((res) => {
				setHelpThreads(res.data)
				props.setLocalStorage("helpThreads", res.data)
			}).catch(() => props.setErrors(['Failed to fetch help threads']))
	}, [])

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* Start Thread */}
				{helpThreads.length == 0 &&
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
				{helpThreads
					.map((helpThread, key) => (
						<div key={key} className={`d-flex border-bottom ${key == 0 && "border-top"}`}>
							<div className="p-2">
								<Link to={`/profile/${helpThread.username}`}>
									<Img
										src={helpThread.pp}
										imgClass="rounded-circle"
										width="50px"
										height="50px" />
								</Link>
							</div>
							<div className="p-2 flex-grow-1">
								<Link to={`/help/${helpThread.link}`}>
									<h6
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
										<b>{helpThread.name}</b>
										<small>{helpThread.username}</small>
									</h6>
									<p className="mb-0">{helpThread.text}
										{helpThread.hasMedia &&
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
							<div className="p-2">
								<small>
									<i className="float-right mr-1">{helpThread.created_at}</i>
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

export default Help