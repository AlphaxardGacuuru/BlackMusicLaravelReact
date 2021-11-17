import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div
			className="sonar-call-to-action-area section-padding-0-100"
			style={{ background: "rgba(255, 215, 0, 0.9)" }}>
			<div className="backEnd-content">
				<h2>Black Music</h2>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
							<h2 className="mt-2" style={{ color: "#fff" }}>Page Not Found</h2>
							<h2 style={{ color: "white" }}>Kenya's best online music store.</h2>
							<br />
							<Link to="/" className="btn sonar-btn">home</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotFound
