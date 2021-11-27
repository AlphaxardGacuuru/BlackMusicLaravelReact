import React from 'react'

import Button from '../components/Button'

const Settings = (props) => {

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: "Refer",
			text: `Check out Black Music\n`,
			url: `https://music.black.co.ke/#/referral/${props.auth.username}`
		}
		// Check if data is shareble
		navigator.canShare(shareData) &&
			navigator.share(shareData)
	}

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<center>
					<h1>INVITES</h1>
					<h5>Invite your friends to Black Music and <span style={{ color: "green" }}>earn!</span></h5>
					<br />
					<h2>How it works</h2>
					<h5>When your invites buy songs, you earn. When their friends invite others, you also earn. this goes on upto the fourth level.
						<br />Let's say you invite John, you get <span style={{ color: "green" }}>KES 1</span> for every song he buys. This is
						<b> LEVEL 1</b>.
						<br />When John invites Lucy, you earn <span style={{ color: "green" }}>KES 0.50</span> for every song she buys. This is <b> LEVEL 2</b>.
						<br />When Lucy invites Kevin, you earn <span style={{ color: "green" }}>KES 0.25</span> for every song he buys. this is <b> LEVEL 3</b>.
						<br />Finaly, When Kevin invites Grace, you earn <span style={{ color: "green" }}>KES 0.125</span> for every song she buys. this is <b> LEVEL 4</b>.
						<br />You will be paid <b>WEEKLY</b> via <span style={{ color: "green" }}>MPESA</span> to the Safaricom number on your account.
						<br />Minimum withdrawal amount <span style={{ color: "green" }}>KES 10.</span>
					</h5>
					<br />
					<h2>Why Black Music is doing this</h2>
					<h5>Black Music desires to change how people think about music and to help local artists earn from their songs.
						<br />To achieve this goal, we need your help to expand and that's why we're willing to give you a cut off of our profits.
						<br />The money we pay you comes from the songs we sell from our site.
					</h5>
					<br />

					<Button
						btnClass="sonar-btn"
						onClick={onShare}
						btnText="invite now" />
				</center>

				<br />
				<br />
				<br />

				<h1 style={{ textAlign: "center" }}>Your Invites</h1>
				<table className="table table-responsive table-hover">
					<thead>
						<tr>
							<th>Level</th>
							<th>Username</th>
							<th>Videos</th>
							<th>Audios</th>
							<th>Revenue</th>
						</tr>
					</thead>
					<tbody>
						{/* Show Referrals */}
						{/* Level 1 */}
						{props.referrals.referrals &&
							props.referrals.referrals
								.map((referral, key) => (
									<tr key={key}>
										<td>{referral.level}</td>
										<td>{referral.referee}</td>
										<td>{referral.boughtVideos}</td>
										<td>{referral.boughtAudios}</td>
										<td className="text-success">KES {referral.revenue}</td>
									</tr>))}
						{/* Show Referrals End */}
					</tbody>
				</table>
				<br />
				<br />

				<h2 style={{ textAlign: "center" }}>Total Revenues</h2>
				<table className="table table-responsive table-hover">
					<thead>
						<tr>
							<th>Level 1</th>
							<th>Level 2</th>
							<th>Level 3</th>
							<th>Level 4</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr className="text-success">
							<td>KES {props.referrals.level1Revenue}</td>
							<td>KES {props.referrals.level2Revenue}</td>
							<td>KES {props.referrals.level3Revenue}</td>
							<td>KES {props.referrals.level4Revenue}</td>
							<td>KES {props.referrals.totalRevenue}</td>
						</tr>
					</tbody>
				</table>
			</div >
			<div className="col-sm-2"></div>
		</div>
	)
}

export default Settings
