import React from 'react'

const Admin = (props) => {

	// Arrays for dates
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return (
		<div className="row">
			<div className="col-sm-2">
				<table className="table">
					{/* <!-- Number of Users Start--> */}
					<tbody>
						<tr>
							<td><h4>Users</h4></td>
							<td>{props.users.length}</td>
						</tr>
					</tbody>
					{/* <!-- Number of Users End --> */}
					{/* <!-- Number of Musicians Start--> */}
					<tbody>
						<tr>
							<td><h4>Musicians</h4></td>
							<td>{props.users.filter((user) => user.account_type == "musician").length}</td>
						</tr>
					</tbody>
					{/* <!-- Number of Musicians End --> */}
					{/* <!-- Number of Songs Start --> */}
					<tbody>
						<tr>
							<td><h4>Songs</h4></td>
							<td>{props.videos.length}</td>
						</tr>
					</tbody>
					{/* <!-- Number of Songs End --> */}
					{/* <!-- Number of Songs Bought Start --> */}
					<tbody>
						<tr>
							<td><h4>Songs Bought</h4></td>
							<td>{props.boughtVideos.length}</td>
						</tr>
					</tbody>
					{/* <!-- Number of Songs Bought End --> */}
					{/* <!-- Revenue Start --> */}
					<tbody>
						<tr>
							<td><h4>Revenue</h4></td>
							<td style={{ color: "green" }}>KES {props.boughtVideos.length * 20}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<td><h6>This week</h6></td>
							<td style={{ color: "green" }}>
								KES {props.boughtVideos
									.filter((boughtVideo) => {
										return ((new Date().getTime() - new Date(boughtVideo.created_at).getTime()) /
											(1000 * 3600 * 24) < 7)
									}).length * 20}
							</td>
						</tr>
					</tbody>
					{/* <!-- Revenue End --> */}
					{/* <!-- Profit Start --> */}
					<tbody>
						<tr>
							<td><h4>Profit</h4></td>
							<td style={{ color: "green" }}>KES {props.boughtVideos.length * 10}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<td><h6>This week</h6></td>
							<td style={{ color: "green" }}>
								KES {props.boughtVideos
									.filter((boughtVideo) => {
										return ((new Date().getTime() - new Date(boughtVideo.created_at).getTime()) /
											(1000 * 3600 * 24) < 7)
									}).length * 10}
							</td>
						</tr>
					</tbody>
				</table>
				{/* <!-- Profit End --> */}
				<br />
			</div>
			<div className="col-sm-9">
				<table className="table table-responsive table-hover">
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
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default Admin
