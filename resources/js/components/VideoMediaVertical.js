import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'

import CartSVG from '../svgs/CartSVG'

const VideoMediaVertical = (props) => {
	return (
		<span className="mx-1 pt-0 px-0 pb-2">
			<div className="thumbnail">
				<Link to={`/video-show/${props.video.id}`}>
					<Img src={props.video.thumbnail.match(/http/) ?
						props.video.thumbnail :
						`storage/${props.video.thumbnail}`}
						width="160em"
						height="90em" />
				</Link>
			</div>
			<Link to={`/video-show/${props.video.id}`}>
				<h6 className="m-0 pt-2 px-1"
					style={{
						width: "150px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "clip"
					}}>
					{props.video.name}
				</h6>
				<h6 className="mt-0 mx-1 mb-2 px-1 py-0">
					<small>{props.video.username} {props.video.ft}</small>
				</h6>
			</Link>
			{props.video.inCart ?
				<button
					className="btn mb-1 rounded-0 text-light"
					style={{
						minWidth: '90px',
						height: '33px',
						backgroundColor: "#232323"
					}}
					onClick={() => props.onCartVideos(props.video.id)}>
					<CartSVG />
				</button> :
				<>
					<button
						className="mysonar-btn white-btn mb-1"
						style={{ minWidth: '90px', height: '33px' }}
						onClick={() => props.onCartVideos(props.video.id)}>
						<CartSVG />
					</button>
					<br />
					<Button
						btnClass={'btn mysonar-btn green-btn btn-2'}
						btnText={'KES 20'}
						onClick={() => onBuyVideos(props.video.id)} />
				</>}
		</span>
	)
}

export default VideoMediaVertical