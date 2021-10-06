import axios from 'axios';
import React from 'react'
import { useState } from 'react'

import Button from '../components/button'

const Admin = (props) => {

	// Arrays for dates
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const [videoPayouts, setVideoPayouts] = useState([])
	const [audioPayouts, setAudioPayouts] = useState([])

	// Fetch Video Payouts
	axios.get(`${props.url}/api/video-payouts/1`)
		.then((res) => setVideoPayouts(res.data))
		.catch(() => props.setErrors(["Failed to fetch video payouts"]))

	// Fetch Audio Payouts
	axios.get(`${props.url}/api/audio-payouts/1`)
		.then((res) => setAudioPayouts(res.data))
		.catch(() => props.setErrors(["Failed to fetch audio payouts"]))

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
			<div className="col-sm-9">
				{/* <!-- Number of Users Start--> */}
				<div className="d-flex justify-content-between">
					<div className="p-2"><h4>Users</h4></div>
					<div className="p-2">{props.users.length}</div>
					{/* <!-- Number of Users End --> */}
					{/* <!-- Number of Musicians Start--> */}
					<div className="p-2"><h4>Musicians</h4></div>
					<div className="p-2">{props.users.filter((user) => user.account_type == "musician").length}</div>
					{/* <!-- Number of Musicians End --> */}
					{/* <!-- Number of Songs Start --> */}
					<div className="p-2"><h4>Songs</h4></div>
					<div className="p-2">{props.videos.length}</div>
					{/* <!-- Number of Songs End --> */}
					{/* <!-- Number of Songs Bought Start --> */}
					<div className="p-2"><h4>Songs Bought</h4></div>
					<div className="p-2">{props.boughtVideos.length}</div>
				</div>
				{/* <!-- Number of Songs Bought End --> */}
				{/* <!-- Revenue Start --> */}
				<div className="d-flex justify-content-between">
					<div className="p-2"><h4>Revenue</h4></div>
					<div className="p-2" style={{ color: "green" }}>KES {props.boughtVideos.length * 20}</div>
					<div className="p-2"><h4>This week</h4></div>
					<div className="p-2" style={{ color: "green" }}>
						KES {props.boughtVideos.filter((boughtVideo) => {
							return ((new Date().getTime() -
								new Date(boughtVideo.created_at).getTime()) /
								(1000 * 3600 * 24) < 7)
						}).length * 20}
					</div>
					{/* <!-- Revenue End --> */}
					{/* <!-- Profit Start --> */}
					<div className="p-2"><h4>Profit</h4></div>
					<div className="p-2" style={{ color: "green" }}>KES {props.boughtVideos.length * 10}</div>
					<div className="p-2"><h6>This week</h6></div>
					<div className="p-2" style={{ color: "green" }}>
						KES {props.boughtVideos
							.filter((boughtVideo) => {
								return ((new Date().getTime() - new Date(boughtVideo.created_at).getTime()) /
									(1000 * 3600 * 24) < 7)
							}).length * 10}
					</div>
				</div>
				{/* <!-- Profit End --> */}

				<br />
				<br />

				<table className="table table-responsive table-borderless">
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
						.filter((user) => user.account_type == "musician")
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
									<td>{props.decos.filter((deco) => deco.username == musician.username).length}</td>
									<td>{musician.dob}</td>
									<td>{musician.location}</td>
									<td>
										{props.boughtAudios
											.filter((boughtAudio) => boughtAudio.username == musician.username).length}
									</td>
									<td>
										{props.boughtVideos
											.filter((boughtVideo) => boughtVideo.username == musician.username).length}
									</td>
									<td>
										{new Date(musician.created_at).getDay()}
										{" " + months[new Date(musician.created_at).getMonth()]}
										{" " + new Date(musician.created_at).getFullYear()}
									</td>
								</tr>
							</tbody>
						))}
				</table>

				<br />
				<br />

				{/* Video Payouts */}
				<h1>Video Payouts</h1>
				<table className="table table-responsive table-borderless thead-light">
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
					{videoPayouts.map((videoPayout, key) => (
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
				<table className="table table-responsive table-borderless thead-light">
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
					{audioPayouts.map((audioPayout, key) => (
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
			<div className="col-sm-1"></div>
		</div >
	)
}

export default Admin
