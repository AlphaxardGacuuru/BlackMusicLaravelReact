import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'
import CartSVG from '../svgs/CartSVG'

const VideoMediaHorizontal = (props) => {
	return (
		<div className="d-flex p-2">
			<div
				className="thumbnail"
				onClick={() => props.setShow(0)}>
				<Link to={`/video-show/${props.video.id}`}>
					<Img
						src={props.video.thumbnail}
						width="160em"
						height="90em" />
				</Link>
			</div>
			<div
				className="ml-2 mr-auto flex-grow-1"
				onClick={() => props.setShow(0)}>
				<Link to={`/video-show/${props.video.id}`}>
					<h6 className="mb-0"
						style={{
							width: "7em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						{props.video.name}
					</h6>
					<h6 className="mb-3"
						style={{
							width: "7em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						<small>{props.video.username}</small>
						<small className="ml-1">{props.video.ft}</small>
					</h6>
				</Link>
				{!props.video.hasBoughtVideo && !props.hasBoughtVideo ?
					props.video.inCart ?
						<button
							className="btn text-light mb-1 rounded-0"
							style={{
								minWidth: "40px",
								height: "33px",
								backgroundColor: "#232323"
							}}
							onClick={() => props.onCartVideos(props.video.id)}>
							<CartSVG />
						</button> :
						<>
							<button
								className="mysonar-btn white-btn mb-1"
								style={{ minWidth: "40px", height: "33px" }}
								onClick={() => props.onCartVideos(props.video.id)}>
								<CartSVG />
							</button>
							<Button
								btnClass="btn mysonar-btn green-btn btn-2 float-right"
								btnText="KES 20"
								onClick={() => props.onBuyVideos(props.video.id)} />
						</> : ""}
			</div>
		</div>
	)
}

VideoMediaHorizontal.defaultProps = {
	hasBoughtVideo: false
}

export default VideoMediaHorizontal
