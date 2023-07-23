import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import SocialMediaInput from "@/components/Core/SocialMediaInput"

import CloseSVG from "@/svgs/CloseSVG"

const PostEdit = (props) => {
	let { id } = useParams()

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="mycontact-form">
					<div className="d-flex justify-content-between mb-1">
						{/* Close Icon */}
						<div className="text-white">
							<Link to="/" className="fs-4">
								<CloseSVG />
							</Link>
						</div>
						{/* Close Icon End */}
						{/* Title */}
						<h1>Edit Post</h1>
						{/* Title End */}
						<a className="invisible">
							<CloseSVG />
						</a>
					</div>

					{/* Social Input */}
					<SocialMediaInput
						{...props}
						placeholder="What's on your mind"
						text={props.post.text}
						showImage={false}
						showPoll={false}
						urlTo={`posts/${id}`}
						editing={true}
					/>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default PostEdit
