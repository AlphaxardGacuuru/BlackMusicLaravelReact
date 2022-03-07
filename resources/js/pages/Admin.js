import React, { useState, useEffect } from 'react'

import Button from '../components/button'

const Admin = (props) => {

	axios.defaults.baseURL = props.url

	const [search, setSearch] = useState()
	const [admin, setAdmin] = useState(props.getLocalStorage("admin"))

	// Fetch Admin
	useEffect(() => {
		axios.get(`/api/admin`)
			.then((res) => {
				setAdmin(res.data)
				props.setLocalStorage("admin", res.data)
			}).catch(() => props.setErrors(["Failed to fetch admin"]))
	}, [])

	// Post song payout
	const onVideoPayout = (username, amount) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/song-payouts`, {
				username: username,
				amount: amount,
			}).then((res) => props.setMessage(res.data))
				.catch((err) => {
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					newError.push(err.response.data.message)
					props.setErrors(newError)
				})
		})
	}

	return (
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
							var regex = new RegExp(e.target.value, 'gi');
							setSearch(regex)
						}} />
				</div>
				{/* Search Form End */}
				<br />
				<br />

				<table className="table table-responsive">
					<thead>
						<tr>
							<th className="border-bottom-0 border-right border-dark">Users</th>
							<th className="border-bottom-0 border-right border-dark">Musicians</th>
							<th className="border-bottom-0 border-right border-dark">Videos</th>
							<th className="border-bottom-0 border-right border-dark">Audios</th>
							<th className="border-bottom-0 border-right border-dark">Videos Bought</th>
							<th className="border-bottom-0 border-right border-dark">Audios Bought</th>
							<th className="border-bottom-0 border-right border-dark">Video Revenue</th>
							<th className="border-bottom-0 border-right border-dark">Audio Revenue</th>
							<th className="border-bottom-0 border-right border-dark">Audio Profit</th>
							<th className="border-bottom-0 border-right-0 border-dark">Video Profit</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{/* Users */}
							<td className="border-right border-dark">{props.users.length}</td>
							{/* Musicians */}
							<td className="border-right border-dark">{props.users.filter((user) => user.account_type == "musician").length}</td>
							{/* Videos */}
							<td className="border-right border-dark">{props.videos.length}</td>
							{/* Audios */}
							<td className="border-right border-dark">{props.audios.length}</td>
							{/* Videos Bought */}
							<td className="border-right border-dark">KES {props.boughtVideos.length}</td>
							{/* Audios Bought */}
							<td className="border-right border-dark">KES {props.boughtAudios.length}</td>
							{/* Video Revenue */}
							<td className="border-right border-dark" style={{ color: "green" }}>
								KES {props.boughtVideos.filter((boughtVideo) => boughtVideo.price == 20).length * 20 +
									props.boughtVideos.filter((boughtVideo) => boughtVideo.price == 200).length * 200}
							</td>
							{/* Audio Revenue */}
							<td className="border-right border-dark" style={{ color: "green" }}>
								KES {props.boughtAudios.filter((boughtAudio) => boughtAudio.price == 100).length * 100}
							</td>
							{/* Video Profit */}
							<td className="border-right border-dark" style={{ color: "green" }}>
								KES {props.boughtVideos.filter((boughtVideo) => boughtVideo.price == 20).length * 10 +
									props.boughtVideos.filter((boughtVideo) => boughtVideo.price == 200).length * 100}
							</td>
							{/* Audio Profit */}
							<td className="border-right-0 border-dark" style={{ color: "green" }}>
								KES {props.boughtAudios.filter((boughtAudio) => boughtAudio.price == 100).length * 50}
							</td>
						</tr>
					</tbody>
				</table>
				<br />
				<br />

				<table className="table table-responsive">
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
						.reverse((a, b) => (a - b))
						.slice(0, 10)
						.map((musician, key) => (
							<tbody key={key} className="border border-0">
								<tr className="border border-0">
									<td className="border-bottom border-dark">{musician.id}</td>
									<td className="border-bottom border-dark">{musician.name}</td>
									<td className="border-bottom border-dark">{musician.username}</td>
									<td className="border-bottom border-dark">{musician.email}</td>
									<td className="border-bottom border-dark">{musician.phone}</td>
									<td className="border-bottom border-dark">{musician.gender}</td>
									<td className="border-bottom border-dark">{musician.account_type}</td>
									<td className="border-bottom border-dark">{musician.bio}</td>
									<td className="border-bottom border-dark"></td>
									<td className="border-bottom border-dark">{musician.dob}</td>
									<td className="border-bottom border-dark">{musician.location}</td>
									<td className="border-bottom border-dark">
										{props.boughtAudios
											.filter((boughtAudio) => {
												boughtAudio.username == musician.username
											}).length}
									</td>
									<td className="border-bottom border-dark">
										{props.boughtVideos
											.filter((boughtVideo) => {
												boughtVideo.username == musician.username
											}).length}
									</td>
									<td className="border-bottom border-dark">{musician.created_at}
									</td>
								</tr>
							</tbody>
						))}
				</table>
				<br />
				<br />

				{/* Song Payouts */}
				<h1>Song Payouts</h1>
				<table className="table table-responsive thead-light">
					<tbody className="border border-0">
						<tr className="border border-0">
							<th className="border-top border-dark">Name</th>
							<th className="border-top border-dark">Username</th>
							<th className="border-top border-dark">Email</th>
							<th className="border-top border-dark">Phone</th>
							<th className="border-top border-dark">Amount</th>
							<th className="border-top border-dark">Send</th>
						</tr>
					</tbody>
					{admin.songPayouts &&
						admin.songPayouts
							.map((songPayout, key) => (
								<tbody key={key} className="border border-0">
									<tr className="border border-0">
										<td className="border-bottom border-dark">{songPayout.name}</td>
										<td className="border-bottom border-dark">{songPayout.username}</td>
										<td className="border-bottom border-dark">{songPayout.email}</td>
										<td className="border-bottom border-dark">{songPayout.phone}</td>
										<td className="border-bottom border-dark">{songPayout.amount}</td>
										<td className="border-bottom border-dark">
											<Button
												btnClass="mysonar-btn white-btn"
												btnText="send"
												onClick={() => onVideoPayout(songPayout.username, songPayout.amount)} />
										</td>
									</tr>
								</tbody>
							))}
				</table>
				{/* Song Payouts End */}
				<br />
				<br />

				<center>
					<button className="mysonar-btn" onClick={props.displayNotification}>notify</button>
					<br />
					<br />
					<button className="mysonar-btn" onClick={props.subscribeToPush}>subscribe to push</button>
					<br />
					<br />
					<button className="mysonar-btn" onClick={props.sendPush}>send push</button>
				</center>
				<br />
				<br />
				<br />
				<br />

			</div>
			<div className="col-sm-2"></div>
		</div >
	)
}

export default Admin
