import React from 'react'
import { useParams } from 'react-router-dom'

import {
	GoogleLoginButton,
	FacebookLoginButton,
	TwitterLoginButton
} from "react-social-login-buttons";
import Img from '../components/Img'

const Referral = (props) => {

	let { referer } = useParams()

	sessionStorage.setItem("referer", referer)

	const onSocial = (website) => {
		window.location.href = `${props.url}/api/login/${website}`

		// axios.get(`${props.url}/api/login/${website}`)
		// .then((res) => console.log(res.data))
	}

	return (
		<>
			<div
				className="sonar-call-to-action-area section-padding-0-100"
				// style={{ background: "rgba(255, 215, 0, 0.9)" }}>
				style={{ background: "rgba(0, 0, 0, 1)" }}>
				<div className="backEnd-content">
					<h2></h2>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
								<center>
									<Img
										src="storage/img/musical-note-black-gold-512.png"
										width="20%"
										height="auto"
										style={{
											// background: "rgba(255, 215, 0, 1)",
											borderRadius: "50%"
										}} />
									<h2 className="mt-2" style={{ color: "#FFD700" }}>Welcome to Black Music</h2>
									<h2 style={{ color: "#FFD700" }}>Kenya's best online music store.</h2>
									<br />
									<br />
									<GoogleLoginButton className="mt-2 rounded-0" onClick={() => onSocial("google")} />
									{/* <FacebookLoginButton className="mt-2 rounded-0" onClick={() => onSocial("facebook")} /> */}
									<TwitterLoginButton className="mt-2 rounded-0" onClick={() => onSocial("twitter")} />
								</center>
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Referral
