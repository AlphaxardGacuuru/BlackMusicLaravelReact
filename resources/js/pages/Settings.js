import React, { useState, useEffect } from "react"
// import Axios from "axios"

import Btn from "@/components/Core/Btn"

const Settings = (props) => {
	const [kopokopoRecipients, setKopokopoRecipients] = useState([])
	const [referrals, setReferrals] = useState([])
	const [songPayouts, setSongPayouts] = useState([])
	const [loadingBtn, setLoadingBtn] = useState(false)

	// Fetch Kopokopo Recipients
	useEffect(() => {
		props.get(
			"kopokopo-recipients",
			setKopokopoRecipients,
			"kopokopoRecipients"
		)
		props.get("referrals", setReferrals, "referrals")
		props.get("song-payouts", setSongPayouts, "songPayouts")
	}, [])

	const reference = kopokopoRecipients.find(
		(reference) => reference.username == props.auth.username
	)

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: "Refer",
			text: `Check out Black Music\n`,
			url: `https://music.black.co.ke/#/referral/${props.auth.username}`,
		}
		// Check if data is shareble
		navigator.canShare(shareData) && navigator.share(shareData)
	}

	// Function to create recipient
	const onCreateRecipient = () => {
		Axios.post(`/api/kopokopo-recipients`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Kopokopo recipients
				props.get(
					"kopokopo-recipients",
					setKopokopoRecipients,
					"kopokopoRecipients"
				)
				// Remove loading button
				setLoadingBtn(false)
			})
			.catch((err) => {
				setLoadingBtn(false)
				props.getErrors(err, true)
			})
	}

	const onTransferFunds = () => {
		Axios.post(`/api/song-payouts`, {
			amount: songPayouts.balance,
			destination_reference: reference.destination_reference,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update song payouts
				props.get("song-payouts", setSongPayouts, "songPayouts")
				// Remove loading button
				setLoadingBtn(false)
			})
			.catch((err) => {
				setLoadingBtn(false)
				props.getErrors(err, true)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<center>
					<h1>Song Payouts</h1>
					<div className="hidden-scroll">
						<table>
							<thead>
								<tr>
									<th>Amount</th>
									<th>Date Sent</th>
								</tr>
							</thead>
							<tbody>
								{/* Show Video Payouts */}
								{/* Level 1 */}
								{songPayouts.songPayouts &&
									songPayouts.songPayouts.map((videoPayout, key) => (
										<tr key={key}>
											<td className="text-success">KES {videoPayout.amount}</td>
											<td>{videoPayout.created_at}</td>
										</tr>
									))}
								{/* Show Referrals End */}
							</tbody>
						</table>
					</div>

					<h4>Outstanding cash</h4>
					<h5 className="text-success">KES {songPayouts.balance}</h5>

					<p>
						By withdrawing less than
						<span className="text-success">KES 1000</span> you will incur
						additional withdrawal charges of{" "}
						<span className="text-success">KES 50</span> from our provider.
					</p>

					{kopokopoRecipients.some(
						(recipient) => recipient.username == props.auth.username
					) ? (
						songPayouts.balance > props.auth.withdrawal && (
							<div>
								{kopokopoRecipients.some(
									(recipient) =>
										recipient.username == props.auth.username &&
										recipient.destination_reference
								) && (
									// Transfer funds button
									<Btn
										btnClass="sonar-btn white-btn"
										onClick={() => {
											onTransferFunds()
											setLoadingBtn(true)
										}}
										btnText="transfer funds"
										loading={loadingBtn}
									/>
								)}
							</div>
						)
					) : (
						// Create wallet button
						<Btn
							btnClass="sonar-btn white-btn"
							onClick={() => {
								onCreateRecipient()
								setLoadingBtn(true)
							}}
							btnText="create wallet"
							loading={loadingBtn}
						/>
					)}
					<br />
					<hr className="border-dark w-50" />
					<br />
					<br />
					<br />

					<h1 id="invites">INVITES</h1>
					<h5>
						Invite your friends to Black Music and{" "}
						<span className="text-success">earn!</span>
					</h5>
					<br />
					<h2>How it works</h2>
					<h5>
						When your invites buy songs, you earn. When their friends invite
						others, you also earn. this goes on upto the fourth level.
						<br />
						Let's say you invite John, you get{" "}
						<span className="text-success">KES 1</span> for every song he buys.
						This is
						<b> LEVEL 1</b>.
						<br />
						When John invites Lucy, you earn{" "}
						<span className="text-success">KES 0.50</span> for every song she
						buys. This is <b> LEVEL 2</b>.
						<br />
						When Lucy invites Kevin, you earn{" "}
						<span className="text-success">KES 0.25</span> for every song he
						buys. this is <b> LEVEL 3</b>.
						<br />
						Finaly, When Kevin invites Grace, you earn{" "}
						<span className="text-success">KES 0.125</span> for every song she
						buys. this is <b> LEVEL 4</b>.
						<br />
						You will be paid <b>WEEKLY</b> via{" "}
						<span className="text-success">MPESA</span> to the Safaricom number
						on your account.
						<br />
						Minimum withdrawal amount{" "}
						<span className="text-success">KES 10.</span>
					</h5>
					<br />
					<h2>Why Black Music is doing this</h2>
					<h5>
						Black Music desires to change how people think about music and to
						help local artists earn from their songs.
						<br />
						To achieve this goal, we need your help to expand and that's why
						we're willing to give you a cut off of our profits.
						<br />
						The money we pay you comes from the songs we sell from our site.
					</h5>
					<br />

					<Btn
						btnClass="sonar-btn white-btn"
						onClick={onShare}
						btnText="invite now"
					/>
				</center>

				<br />
				<br />
				<br />

				<h1 style={{ textAlign: "center" }}>Your Invites</h1>
				<div className="hidden-scroll">
					<table>
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
							{referrals.referrals &&
								referrals.referrals.map((referral, key) => (
									<tr key={key}>
										<td>{referral.level}</td>
										<td>{referral.referee}</td>
										<td>{referral.boughtVideos}</td>
										<td>{referral.boughtAudios}</td>
										<td className="text-success border-0">
											KES {referral.revenue}
										</td>
									</tr>
								))}
							{/* Show Referrals End */}
						</tbody>
					</table>
				</div>
				<br />
				<br />

				<h2 style={{ textAlign: "center" }}>Total Revenues</h2>
				<div className="hidden-scroll">
					<table>
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
								<td>KES {referrals.level1Revenue}</td>
								<td>KES {referrals.level2Revenue}</td>
								<td>KES {referrals.level3Revenue}</td>
								<td>KES {referrals.level4Revenue}</td>
								<td>KES {referrals.totalRevenue}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default Settings
