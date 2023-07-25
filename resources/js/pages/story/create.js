import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import SocialMediaInput from "@/components/Core/SocialMediaInput"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="mycontact-form">
					<div className="d-flex justify-content-between my-2">
						{/* <!-- Close Icon --> */}
						<div className="text-white">
							<Link to="/" style={{ fontSize: "1.2em" }}>
								<CloseSVG />
							</Link>
						</div>
						<h1>Create Story</h1>
						<a className="invisible">
							<CloseSVG />
						</a>
					</div>
				</div>

				{/* Social Media Input */}
				<div className="bottomNav">
					<SocialMediaInput
						{...props}
						placeholder="What's on your mind"
						showStory={true}
						urlTo="stories"
						required={false}
						btnText="post"
						redirect="/"
					/>
				</div>
				{/* Social Media Input End */}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default create
