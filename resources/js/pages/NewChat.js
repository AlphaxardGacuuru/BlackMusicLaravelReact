import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'

const NewChat = (props) => {

	const [search, setSearch] = useState("!@#$%^&")

	const searchInput = useRef(null)

	setTimeout(() => searchInput.current.focus(), 1000)

	// Get user results
	var userResults = props.users
		.filter((user) => {
			return user.username != props.auth.username &&
				user.username.match(search)
		})

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* <!-- ***** Header Area Start ***** --> */}
				<header style={{ backgroundColor: "#232323" }} className="header-area anti-hidden">
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12 p-0">
								{/* <!-- Contact form --> */}
								<div className="contact-form">
									<input
										ref={searchInput}
										className="form-control"
										placeholder="Select user"
										style={{ width: "100%" }}
										onChange={(e) => {
											var regex = new RegExp(e.target.value, 'gi');
											setSearch(regex)
										}} />
								</div>
							</div>
						</div>
					</div>
				</header>
				<br className="anti-hidden" />

				{/* <!-- ****** Artists Area Start ****** --> */}
				<div className="hidden-scroll">
					{userResults.map((user, key) => (
						<div key={key} className="d-flex">
							<div className="p-1">
								<Link to={`/chat/${user.username}`}>
									<Img
										src={user.pp}
										imgClass="rounded-circle"
										width="50px"
										height="50px" />
								</Link>
							</div>
							<div className="p-2 flex-grow-1" style={{ width: "65%" }}>
								<Link to={`/chat/${user.username}`}>
									<h6
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
										<b>{user.name}</b>
										<small>{user.username}</small>
									</h6>
									<p className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
											margin: 0,
										}}>{user.bio}</p>
								</Link>
							</div>
							<div className="p-1">
								<small>
									<i className="float-right mr-1">{user.account_type}</i>
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

export default NewChat