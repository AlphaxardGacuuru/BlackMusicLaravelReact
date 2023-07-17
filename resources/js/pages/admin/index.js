import React, { useState, useEffect } from "react"

import Btn from "@/components/Core/Btn"
import PersonSVG from "@/svgs/PersonSVG"

const Admin = (props) => {
	Axios.defaults.baseURL = props.url

	const [search, setSearch] = useState()
	const [admin, setAdmin] = useState(props.getLocalStorage("admin"))
	const [kopokopoRecipients, setKopokopoRecipients] = useState(
		props.getLocalStorage("kopokopoRecipients")
	)
	const [karaokeAudio, setKaraokeAudio] = useState()

	useEffect(() => {
		// Fetch Admin
		Axios.get(`/api/admin`)
			.then((res) => {
				setAdmin(res.data)
				props.setLocalStorage("admin", res.data)
			})
			.catch(() => props.setErrors(["Failed to fetch admin"]))

		// Fetch Kopokopo Recipients
		Axios.get(`/api/kopokopo-recipients`)
			.then((res) => {
				// Save to state only to prevent wrong data persistence in local storage
				setKopokopoRecipients(res.data)
			})
			.catch(() => props.setErrors(["Failed to fetch kopokopo recipients"]))

		//Fetch Users
		Axios.get(`/api/users`)
			.then((res) => {
				props.setUsers(res.data)
				props.setLocalStorage("users", res.data)
			})
			.catch(() => props.setErrors(["Failed to fetch users"]))
	}, [])

	// Set Karaoke Audio
	const onKaraokeAudio = () => {
		Axios.get("sanctum/csrf-cookie").then(() => {
			Axios.post("api/karaoke-audios", {
				audio: karaokeAudio,
			})
				.then((res) => {
					props.setMessages([res.data])
					setKaraokeAudio()
				})
				.catch((err) => {
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					props.setErrors(newError)
				})
		})
	}

	return (
		<>
			<div className="row">
				{/* Users */}
				<div className="col-sm-2">
					<div className="d-flex justify-content-between bg-primary">
						<div className="p-3">
							<h2 className="text-light">{props.users.length}</h2>
							<h5 className="text-light">Users</h5>
						</div>
						<div className="p-2">
							<span
								className="text-dark"
								style={{ fontSize: "4em", opacity: "0.2" }}>
								<PersonSVG />
							</span>
						</div>
					</div>
				</div>
				{/* Users End */}
				<div className="col-sm-2">
					<div className="d-flex justify-content-between bg-secondary">
						<div className="p-3">
							<h2 className="text-light">
								{
									props.users.filter((user) => user.account_type == "musician")
										.length
								}
							</h2>
							<h5 className="text-light">Musicians</h5>
						</div>
						<div className="p-2">
							<span
								className="text-dark"
								style={{ fontSize: "4em", opacity: "0.2" }}>
								<PersonSVG />
							</span>
						</div>
					</div>
				</div>
				<div className="col-sm-2"></div>
				<div className="col-sm-2"></div>
				<div className="col-sm-2"></div>
				<div className="col-sm-2"></div>
			</div>

			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8">
					{/* <-- Search form --> */}
					<div className="contact-form">
						<input
							name="search"
							className="form-control"
							placeholder="Search"
							onChange={(e) => {
								var regex = new RegExp(e.target.value, "gi")
								setSearch(regex)
							}}
						/>
					</div>
					{/* Search Form End */}
					<br />
					<br />

					<table className="table table-responsive hidden-scroll">
						<thead>
							<tr>
								<th className="border-bottom-0 border-right border-dark">
									Users
								</th>
								<th className="border-bottom-0 border-right border-dark">
									Musicians
								</th>
								<th className="border-bottom-0 border-right border-dark">
									Videos
								</th>
								<th className="border-bottom-0 border-right border-dark">
									Audios
								</th>
								<th className="border-bottom-0 border-right border-dark">
									Videos Bought
								</th>
								<th className="border-bottom-0 border-right border-dark">
									Audios Bought
								</th>
								<th className="border-bottom-0 border-right border-dark text-success">
									Video Revenue
								</th>
								<th className="border-bottom-0 border-right border-dark text-success">
									Audio Revenue
								</th>
								<th className="border-bottom-0 border-right border-dark text-success">
									Video Profit
								</th>
								<th className="border-bottom-0 border-right-0 border-dark text-success">
									Audio Profit
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								{/* Users */}
								<td className="border-right border-dark">
									{props.users.length}
								</td>
								{/* Musicians */}
								<td className="border-right border-dark">
									{
										props.users.filter(
											(user) => user.account_type == "musician"
										).length
									}
								</td>
								{/* Videos */}
								<td className="border-right border-dark">
									{props.videos.length}
								</td>
								{/* Audios */}
								<td className="border-right border-dark">
									{props.audios.length}
								</td>
								{/* Videos Bought */}
								<td className="border-right border-dark">
									{props.boughtVideos.length}
								</td>
								{/* Audios Bought */}
								<td className="border-right border-dark">
									{props.boughtAudios.length}
								</td>
								{/* Video Revenue */}
								<td className="border-right border-dark text-success">
									KES {props.boughtVideos.length * 20}
								</td>
								{/* Audio Revenue */}
								<td className="border-right border-dark text-success">
									KES {props.boughtAudios.length * 10}
								</td>
								{/* Video Profit */}
								<td className="border-right border-dark text-success">
									KES {props.boughtVideos.length * 10}
								</td>
								{/* Audio Profit */}
								<td className="border-right-0 border-dark text-success">
									KES {props.boughtAudios.length * 5}
								</td>
							</tr>
						</tbody>
					</table>
					<br />
					<br />

					<table className="table table-responsive hidden-scroll">
						<tbody className="border border-0">
							<tr className="border border-0">
								<th className="border-top border-dark">User ID</th>
								<th className="border-top border-dark">Name</th>
								<th className="border-top border-dark">Username</th>
								<th className="border-top border-dark">Email</th>
								<th className="border-top border-dark">Phone</th>
								<th className="border-top border-dark">Gender</th>
								<th className="border-top border-dark">Acc Type</th>
								<th className="border-top border-dark">Bio</th>
								<th className="border-top border-dark">Deco</th>
								<th className="border-top border-dark">DOB</th>
								<th className="border-top border-dark">Location</th>
								<th className="border-top border-dark">Audios Bought</th>
								<th className="border-top border-dark">Videos Bought</th>
								<th className="border-top border-dark">Date Joined</th>
							</tr>
						</tbody>
						{props.users
							.filter((user) => user.username.match(search))
							.reverse((a, b) => a - b)
							.slice(0, 10)
							.map((musician, key) => (
								<tbody key={key} className="border border-0">
									<tr className="border border-0">
										<td className="border-bottom border-dark">{musician.id}</td>
										<td className="border-bottom border-dark">
											{musician.name}
										</td>
										<td className="border-bottom border-dark">
											{musician.username}
										</td>
										<td className="border-bottom border-dark">
											{musician.email}
										</td>
										<td className="border-bottom border-dark">
											{musician.phone}
										</td>
										<td className="border-bottom border-dark">
											{musician.gender}
										</td>
										<td className="border-bottom border-dark">
											{musician.account_type}
										</td>
										<td className="border-bottom border-dark">
											{musician.bio}
										</td>
										<td className="border-bottom border-dark"></td>
										<td className="border-bottom border-dark">
											{musician.dob}
										</td>
										<td className="border-bottom border-dark">
											{musician.location}
										</td>
										<td className="border-bottom border-dark">
											{
												props.boughtAudios.filter((boughtAudio) => {
													boughtAudio.username == musician.username
												}).length
											}
										</td>
										<td className="border-bottom border-dark">
											{
												props.boughtVideos.filter((boughtVideo) => {
													boughtVideo.username == musician.username
												}).length
											}
										</td>
										<td className="border-bottom border-dark">
											{musician.created_at}
										</td>
									</tr>
								</tbody>
							))}
					</table>
					<br />
					<br />

					{/* Song Payouts */}
					<h1>Song Payouts</h1>
					<table className="table table-responsive thead-light hidden-scroll">
						<tbody className="border border-0">
							<tr className="border border-0">
								<th className="border-top border-dark">Name</th>
								<th className="border-top border-dark">Username</th>
								<th className="border-top border-dark">Amount</th>
								<th className="border-top border-dark">Earnings</th>
								<th className="border-top border-dark">Payouts</th>
								<th className="border-top border-dark">Balance</th>
							</tr>
						</tbody>
						{admin.songPayouts &&
							admin.songPayouts.map((songPayout, key) => (
								<tbody key={key} className="border border-0">
									<tr className="border border-0">
										<td className="border-bottom border-dark">
											{songPayout.name}
										</td>
										<td className="border-bottom border-dark">
											{songPayout.username}
										</td>
										<td className="border-bottom border-dark">
											{songPayout.amount}
										</td>
										<td className="border-bottom border-dark">
											{songPayout.earnings}
										</td>
										<td className="border-bottom border-dark">
											{songPayout.payouts}
										</td>
										<td className="border-bottom border-dark">
											{songPayout.balance}
										</td>
									</tr>
								</tbody>
							))}
					</table>
					{/* Song Payouts End */}
					<br />
					<br />

					{/* Kopokopo Recipients */}
					<h1>Kopokopo Recipients</h1>
					<table className="table table-responsive thead-light hidden-scroll">
						<tbody className="border border-0">
							<tr className="border border-0">
								<th className="border-top border-dark">Name</th>
								<th className="border-top border-dark">Username</th>
								<th className="border-top border-dark">Phone</th>
								<th className="border-top border-dark">
									Destination Reference
								</th>
							</tr>
						</tbody>
						{kopokopoRecipients
							.filter(
								(kopokopoRecipient) =>
									kopokopoRecipient.destination_reference == false
							)
							.map((kopokopoRecipient, key) => (
								<tbody key={key} className="border border-0">
									<tr className="border border-0">
										<td className="border-bottom border-dark">
											{kopokopoRecipient.name}
										</td>
										<td className="border-bottom border-dark">
											{kopokopoRecipient.username}
										</td>
										<td className="border-bottom border-dark">
											{kopokopoRecipient.phone}
										</td>
										<td className="border-bottom border-dark">
											{kopokopoRecipient.destination_reference}
										</td>
									</tr>
								</tbody>
							))}
					</table>
					<br />
					<br />

					{/* Karaoke Audio */}
					<div
						className="contact-form text-center call-to-action-content wow fadeInUp"
						data-wow-delay="0.5s">
						<select
							name="album"
							className="form-control"
							required={true}
							onChange={(e) => setKaraokeAudio(e.target.value)}>
							<option defaultValue value="">
								Select Audio
							</option>
							{props.audios.map((audio, key) => (
								<option
									key={key}
									value={audio.id}
									className="bg-dark text-light">
									{audio.name}
								</option>
							))}
						</select>
						<br />
						<br />

						<Btn btnText="set karaoke audio" onClick={onKaraokeAudio} />
						<br />
						<br />
						<br />
					</div>

					<center>
						<button className="mysonar-btn" onClick={props.displayNotification}>
							notify
						</button>
						<br />
						<br />
						<button className="mysonar-btn" onClick={props.subscribeToPush}>
							subscribe to push
						</button>
						<br />
						<br />
						<button className="mysonar-btn" onClick={props.sendPush}>
							send push
						</button>
					</center>
					<br />
					<br />
					<br />
					<br />
				</div>
				<div className="col-sm-2"></div>
			</div>
		</>
	)
}

export default Admin
