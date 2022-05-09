import React from 'react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
	return (
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-10">
				<div className="my-2 ml-2">
					<Link to="/">
						<svg
							width="2em"
							height="2em"
							viewBox="0 0 16 16"
							className="bi bi-arrow-left-short"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd"
								d="M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
							<path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
						</svg>
					</Link>
				</div>
				<iframe
					src="https://www.iubenda.com/privacy-policy/38639633"
					title="privacy policy"
					frameBorder="0"
					width="100%"
					height="800px"
					scrolling="no">
				</iframe>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default PrivacyPolicy