import React, { useState } from 'react'

import Button from '../components/button'

const Admin = (props) => {

	const [search, setSearch] = useState()

	// Post video payout
	const onVideoPayout = (username, amount) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-payouts`, {
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

	// Post audio payout
	const onAudioPayout = (username, amount) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audio-payouts`, {
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
							<th>Users</th>
							<th>Musicians</th>
							<th>Videos</th>
							<th>Audios</th>
							<th>Videos Bought</th>
							<th>Audios Bought</th>
							<th>Video Revenue</th>
							<th>Audio Revenue</th>
							<th>This week</th>
							<th>Profit</th>
							<th>This week</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{props.users.length}</td>
							<td>{props.users.filter((user) => user.account_type == "musician").length}</td>
							<td>{props.videos.length}</td>
							<td>{props.audios.length}</td>
							<td style={{ color: "green" }}>KES {props.boughtVideos.length * 10}</td>
							<td style={{ color: "green" }}>KES {props.boughtAudios.length * 10}</td>
							<td style={{ color: "green" }}>
								KES {props.boughtVideos
									.filter((boughtVideo) => {
										return ((new Date().getTime() -
											new Date(boughtVideo.created_at).getTime()) /
											(1000 * 3600 * 24) < 7)
									}).length * 20}
							</td>
							<td style={{ color: "green" }}>
								KES {props.boughtAudios
									.filter((boughtVideo) => {
										return ((new Date().getTime() -
											new Date(boughtVideo.created_at).getTime()) /
											(1000 * 3600 * 24) < 7)
									}).length * 20}
							</td>
							<td style={{ color: "green" }}>
								KES {props.boughtVideos
									.filter((boughtVideo) => {
										return ((new Date().getTime() - new Date(boughtVideo.created_at).getTime()) /
											(1000 * 3600 * 24) < 7)
									}).length * 10}
							</td>
							<td style={{ color: "green" }}>
								KES {props.boughtAudios
									.filter((boughtVideo) => {
										return ((new Date().getTime() - new Date(boughtVideo.created_at).getTime()) /
											(1000 * 3600 * 24) < 7)
									}).length * 10}
							</td>
							<td>{props.boughtVideos.length}</td>
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

				{/* Video Payouts */}
				<h1>Video Payouts</h1>
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
					{props.videoPayouts.videoPayouts &&
						props.videoPayouts.videoPayouts
							.map((videoPayout, key) => (
								<tbody key={key}>
									<tr>
										<td>{videoPayout.name}</td>
										<td>{videoPayout.username}</td>
										<td>{videoPayout.email}</td>
										<td>{videoPayout.phone}</td>
										<td>{videoPayout.amount}</td>
										<td>
											<Button
												btnClass="mysonar-btn"
												btnText="send"
												onClick={() => onVideoPayout(videoPayout.username, videoPayout.amount)} />
										</td>
									</tr>
								</tbody>
							))}
				</table>
				{/* Video Payouts End */}

				<br />
				<br />

				{/* Audio Payouts */}
				<h1>Audio Payouts</h1>
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
					{props.audioPayouts.audioPayouts &&
						props.audioPayouts.audioPayouts
							.map((audioPayout, key) => (
								<tbody key={key}>
									<tr>
										<td>{audioPayout.name}</td>
										<td>{audioPayout.username}</td>
										<td>{audioPayout.email}</td>
										<td>{audioPayout.phone}</td>
										<td>{audioPayout.amount}</td>
										<td>
											<Button
												btnClass="mysonar-btn"
												btnText="send"
												onClick={() => onAudioPayout(audioPayout.username, audioPayout.amount)} />
										</td>
									</tr>
								</tbody>
							))}
				</table>
				{/* Audio Payouts End */}
			</div>
			<div className="col-sm-2"></div>
		</div >
	)
}

export default Admin
