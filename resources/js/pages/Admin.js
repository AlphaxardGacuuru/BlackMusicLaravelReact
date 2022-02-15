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
							<th className="border">Users</th>
							<th className="border">Musicians</th>
							<th className="border">Videos</th>
							<th className="border">Audios</th>
							<th className="border">Videos Bought</th>
							<th className="border">Audios Bought</th>
							<th className="border">Video Revenue</th>
							<th className="border">Audio Revenue</th>
							<th className="border">Video Profit</th>
							<th className="border">Audio Profit</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{/* Users */}
							<td className="border">{props.users.length}</td>
							{/* Musicians */}
							<td className="border">{props.users.filter((user) => user.account_type == "musician").length}</td>
							{/* Videos */}
							<td className="border">{props.videos.length}</td>
							{/* Audios */}
							<td className="border">{props.audios.length}</td>
							{/* Videos Bought */}
							<td className="border">KES {props.boughtVideos.length}</td>
							{/* Audios Bought */}
							<td className="border">KES {props.boughtAudios.length}</td>
							{/* Video Revenue */}
							<td className="border" style={{ color: "green" }}>
								KES {props.boughtVideos
									.filter((boughtVideo) => boughtVideo.price == 20).length * 20 +
									props.boughtVideos
										.filter((boughtVideo) => boughtVideo.price == 200).length * 200}
							</td>
							{/* Audio Revenue */}
							<td className="border" style={{ color: "green" }}>
								KES {props.boughtAudios
									.filter((boughtAudio) => boughtAudio.price == 100).length * 100}
							</td>
							{/* Video Profit */}
							<td className="border" style={{ color: "green" }}>
								KES {props.boughtVideos
									.filter((boughtVideo) => boughtVideo.price == 20).length * 10 +
									props.boughtVideos
										.filter((boughtVideo) => boughtVideo.price == 200).length * 100}
							</td>
							{/* Audio Profit */}
							<td className="border" style={{ color: "green" }}>
								KES {props.boughtAudios
									.filter((boughtAudio) => boughtAudio.price == 100).length * 50}
							</td>
						</tr>
					</tbody>
				</table>
				<br />
				<br />

				<table className="table table-responsive">
					<tbody>
						<tr>
							<th>User ID</th>
							<th>Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Gender</th>
							<th>Acc Type</th>
							<th>Bio</th>
							<th>Deco</th>
							<th>DOB</th>
							<th>Location</th>
							<th>Audios Bought</th>
							<th>Videos Bought</th>
							<th>Date Joined</th>
						</tr>
					</tbody>
					{props.users
						.filter((user) => user.username.match(search))
						.reverse((a, b) => (a - b))
						.slice(0, 10)
						.map((musician, key) => (
							<tbody key={key}>
								<tr>
									<td>{musician.id}</td>
									<td>{musician.name}</td>
									<td>{musician.username}</td>
									<td>{musician.email}</td>
									<td>{musician.phone}</td>
									<td>{musician.gender}</td>
									<td>{musician.account_type}</td>
									<td>{musician.bio}</td>
									<td></td>
									<td>{musician.dob}</td>
									<td>{musician.location}</td>
									<td>
										{props.boughtAudios
											.filter((boughtAudio) => {
												boughtAudio.username == musician.username
											}).length}
									</td>
									<td>
										{props.boughtVideos
											.filter((boughtVideo) => {
												boughtVideo.username == musician.username
											}).length}
									</td>
									<td>{musician.created_at}
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
					<tbody>
						<tr>
							<th>Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Amount</th>
							<th>Send</th>
						</tr>
					</tbody>
					{admin.songPayouts &&
						admin.songPayouts
							.map((songPayout, key) => (
								<tbody key={key}>
									<tr>
										<td>{songPayout.name}</td>
										<td>{songPayout.username}</td>
										<td>{songPayout.email}</td>
										<td>{songPayout.phone}</td>
										<td>{songPayout.amount}</td>
										<td>
											<Button
												btnClass="mysonar-btn"
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
			</div>
			<div className="col-sm-2"></div>
		</div >
	)
}

export default Admin
