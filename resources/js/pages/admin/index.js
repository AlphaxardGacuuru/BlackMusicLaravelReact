import React, { useState, useEffect } from "react"

import Btn from "@/components/Core/Btn"
import PersonSVG from "@/svgs/PersonSVG"

const Admin = (props) => {
	const [admin, setAdmin] = useState({})
	const [users, setUsers] = useState([])
	const [videos, setVideos] = useState([])
	const [audios, setAudios] = useState([])
	const [kopokopoRecipients, setKopokopoRecipients] = useState([])
	const [songPayouts, setSongPayouts] = useState([])
	const [karaokeAudio, setKaraokeAudio] = useState()
	const [loading, setLoading] = useState()

	const [search, setSearch] = useState()

	useEffect(() => {
		props.get("/admin/admin", setAdmin)
		props.get("/admin/users", setUsers)
		props.get("/admin/videos", setVideos)
		props.get("/admin/audios", setAudios)
		props.get("/admin/kopokopo-recipients", setKopokopoRecipients)
		props.get("/admin/song-payouts", setSongPayouts)
	}, [])

	// Set Karaoke Audio
	const onKaraokeAudio = () => {
		// Show loader
		setLoading(true)

		Axios.get("sanctum/csrf-cookie").then(() => {
			Axios.post("api/karaoke-audios", {
				audio_id: karaokeAudio,
			})
				.then((res) => {
					props.setMessages([res.data.message])
					setLoading(false)
				})
				.catch((err) => {
					props.getErrors(err)
					setLoading(false)
				})
		})
	}

	return (
		<>
			<div className="row">
				{/* Users */}
				<div className="col-sm-2">
					<div
						className="d-flex justify-content-between"
						style={{ backgroundColor: "#232323" }}>
						<div className="p-3">
							<h2 className="text-light">{admin.totalUsers}</h2>
							<h5 className="text-light">Users</h5>
						</div>
						<div className="p-2">
							<span
								className="text-light"
								style={{ fontSize: "4em", opacity: "1" }}>
								<PersonSVG />
							</span>
						</div>
					</div>
				</div>
				{/* Users End */}
				<div className="col-sm-2">
					<div
						className="d-flex justify-content-between"
						style={{ backgroundColor: "#232323" }}>
						<div className="p-3">
							<h2 className="text-light">{admin.totalMusicians}</h2>
							<h5 className="text-light">Musicians</h5>
						</div>
						<div className="p-2">
							<span
								className="text-light"
								style={{ fontSize: "4em", opacity: "1" }}>
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

			<br />
			<br />

			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8">
					{/* Aggregated Data */}
					<div className="table-responsive hidden-scroll">
						<table className="table table-dark table-hover">
							<thead>
								<tr>
									<th>Users</th>
									<th>Musicians</th>
									<th>Videos</th>
									<th>Audios</th>
									<th>Videos Bought</th>
									<th>Audios Bought</th>
									<th className="text-success">Video Revenue</th>
									<th className="text-success">Audio Revenue</th>
									<th className="text-success">Video Profit</th>
									<th className="text-success">Audio Profit</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{users.length}</td>
									<td>{admin.totalMusicians}</td>
									<td>{admin.totalVideos}</td>
									<td>{admin.totalAudios}</td>
									<td>{admin.totalBoughtVideos}</td>
									<td>{admin.totalBoughtAudios}</td>
									<td className="text-success">
										KES {admin.totalBoughtVideos * 20}
									</td>
									<td className="text-success">
										KES {admin.totalBoughtAudios * 10}
									</td>
									<td className="text-success">
										KES {admin.totalBoughtVideos * 10}
									</td>
									<td className="text-success">
										KES {admin.totalBoughtAudios * 5}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* Aggregated Data End */}
					<br />
					<br />

					{/* Users */}
					<h1>Users</h1>
					<div className="table-responsive hidden-scroll">
						<table className="table table-dark table-hover">
							<thead>
								<tr>
									<th colSpan="14">
										{/* Search form */}
										<div className="mycontact-form">
											<input
												name="search"
												className="my-form"
												placeholder="Search"
												onChange={(e) => {
													var regex = new RegExp(e.target.value, "gi")
													setSearch(regex)
												}}
											/>
										</div>
										{/* Search Form End */}
									</th>
								</tr>
							</thead>
							<thead>
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
							</thead>
							<tbody>
								{users
									.filter((user) => user.username.match(search))
									.slice(0, 10)
									.map((musician, key) => (
										<tr key={key}>
											<td>{musician.id}</td>
											<td>{musician.name}</td>
											<td>{musician.username}</td>
											<td>{musician.email}</td>
											<td>{musician.phone}</td>
											<td>{musician.gender}</td>
											<td>{musician.accountType}</td>
											<td>{musician.bio}</td>
											<td>{musician.decos}</td>
											<td>{musician.dob}</td>
											<td>{musician.location}</td>
											<td>{musician.boughtAudios}</td>
											<td>{musician.boughtVideos}</td>
											<td>{musician.createdAt}</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
					{/* Users End */}

					<br />
					<br />

					{/* Song Payouts */}
					<h1>Song Payouts</h1>
					<div className="table-responsive hidden-scroll">
						<table className="table table-dark table-hover">
							<tbody>
								<tr>
									<th>Name</th>
									<th>Username</th>
									<th>Amount</th>
									<th>Earnings</th>
									<th>Payouts</th>
									<th>Balance</th>
								</tr>
							</tbody>
							{songPayouts.map((songPayout, key) => (
								<tbody key={key}>
									<tr>
										<td>{songPayout.name}</td>
										<td>{songPayout.username}</td>
										<td>{songPayout.amount}</td>
										<td>{songPayout.earnings}</td>
										<td>{songPayout.payouts}</td>
										<td>{songPayout.balance}</td>
									</tr>
								</tbody>
							))}
						</table>
					</div>

					{/* Song Payouts End */}
					<br />
					<br />

					{/* Kopokopo Recipients */}
					<h1>Kopokopo Recipients</h1>
					<div className="table-responsive hidden-scroll">
						<table className="table table-dark table-hover">
							<tbody>
								<tr>
									<th>Name</th>
									<th>Username</th>
									<th>Phone</th>
									<th>Destination Reference</th>
								</tr>
							</tbody>
							{kopokopoRecipients.map((kopokopoRecipient, key) => (
								<tbody key={key}>
									<tr>
										<td>{kopokopoRecipient.name}</td>
										<td>{kopokopoRecipient.username}</td>
										<td>{kopokopoRecipient.phone}</td>
										<td>{kopokopoRecipient.destination_reference}</td>
									</tr>
								</tbody>
							))}
						</table>
					</div>
					<br />
					<br />

					{/* Karaoke Audio */}
					<div
						className="mycontact-form text-center call-to-action-content wow fadeInUp"
						data-wow-delay="0.5s">
						<select
							name="album"
							className="my-form"
							required={true}
							onChange={(e) => setKaraokeAudio(e.target.value)}>
							<option defaultValue value="">
								Select Audio
							</option>
							{audios.map((audio, key) => (
								<option key={key} value={audio.id}>
									{audio.name}
								</option>
							))}
						</select>
						<br />
						<br />

						<Btn
							btnText="set karaoke audio"
							loading={loading}
							onClick={onKaraokeAudio}
						/>
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
