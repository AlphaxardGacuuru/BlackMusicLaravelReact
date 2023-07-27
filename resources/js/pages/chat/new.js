import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import BackSVG from "@/svgs/BackSVG"

export default function NewChat(props) {
	const [search, setSearch] = useState("")

	const searchInput = useRef(null)

	setTimeout(() => searchInput.current.focus(), 100)

	useEffect(() => {
		props.get("users", props.setUsers)
	}, [])

	// Get user results
	var userResults = props.users
		.filter((user) => user.username != props.auth.username)
		.filter((user) => user.username.match(search) || user.name.match(search))

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* <!-- ***** Header Area Start ***** --> */}
				<header
					style={{ backgroundColor: "#232323" }}
					className="header-area">
					<div className="d-flex p-2">
						<div className="pt-3">
							<Link to="/chat">
								<BackSVG />
							</Link>
						</div>
						<div className="flex-grow-1">
							{/* <!-- Contact form --> */}
							<div className="mycontact-form">
								<input
									ref={searchInput}
									className="my-form"
									placeholder="Select user"
									style={{ width: "100%" }}
									onChange={(e) => {
										var regex = new RegExp(e.target.value, "gi")
										setSearch(regex)
									}}
								/>
							</div>
						</div>
					</div>
				</header>
				<br />
				<br />
				<br />
				<br />

				{/* <!-- ****** Artists Area Start ****** --> */}
				<div className="hidden-scroll">
					{userResults.map((user, key) => (
						<div
							key={key}
							className="d-flex">
							<div className="p-1">
								<Link to={`/chat/${user.username}`}>
									<Img
										src={user.avatar}
										className="rounded-circle"
										width="50px"
										height="50px"
									/>
								</Link>
							</div>
							<div
								className="p-2 flex-grow-1"
								style={{ width: "65%" }}>
								<Link to={`/chat/show/${user.username}`}>
									<h6
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										<b>{user.name}</b>
										<small>{user.username}</small>
									</h6>
									<p
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
											margin: 0,
										}}>
										{user.bio}
									</p>
								</Link>
							</div>
							<div className="p-1">
								<small>
									<i className="float-end me-1">{user.accountType}</i>
								</small>
							</div>
						</div>
					))}
				</div>
				{/* <!-- ****** Artists Area End ****** - */}
			</div>

			<div className="col-sm-4"></div>
		</div>
	)
}
