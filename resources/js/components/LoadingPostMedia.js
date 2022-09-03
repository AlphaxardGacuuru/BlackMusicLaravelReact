import React from 'react'

import CommentSVG from '../svgs/CommentSVG'
import DecoSVG from '../svgs/DecoSVG'
import HeartSVG from '../svgs/HeartSVG'

const LoadingPostMedia = () => {
	return (
		<div className='media p-2'>
			<div className='media-left'>
				<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}></div>
			</div>
			<div className='media-body'>
				<h6 className="media-heading m-0"
					style={{
						width: "100%",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "clip"
					}}>
					<b className="gradient" style={{ color: "#232323" }}>post.name</b>
					<small className="gradient" style={{ color: "#232323" }}>post.username</small>
					<span className="ml-1 gradient" style={{ color: "#232323" }}>
						<DecoSVG />
						<small className="ml-1" style={{ color: "#232323" }}>post.decos</small>
					</span>
					<small>
						<i className="float-right mr-1 gradient" style={{ color: "#232323" }}>post.created_at</i>
					</small>
				</h6>
				<p className="my-2 gradient" style={{ color: "#232323" }}>post.text</p>

				{/* Post likes */}
				<a href="#" className="gradient" style={{ color: "#232323" }}>
					<HeartSVG />
					<small className="ml-1" style={{ color: "#232323" }}>po</small>
				</a>

				{/* Post comments */}
				<span className="gradient" style={{ color: "#232323" }}>
					<CommentSVG />
					<small className="ml-1" style={{ color: "#232323" }}>post.comments</small>
				</span>
			</div>
		</div>
	)
}

export default LoadingPostMedia