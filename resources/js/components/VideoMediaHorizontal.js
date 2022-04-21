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
				<Link to={props.link}>
					<Img
						src={props.thumbnail}
						width="160em"
						height="90em" />
				</Link>
			</div>
			<div
				className="ml-2 mr-auto flex-grow-1"
				onClick={() => props.setShow(0)}>
				<Link to={props.link}>
					<h6 className="mb-0"
						style={{
							width: "7em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						{props.name}
					</h6>
					<h6 className="mb-3"
						style={{
							width: "7em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						<small>{props.username}</small>
						<small className="ml-1">{props.ft}</small>
					</h6>
				</Link>
				{props.showCartandBuyButton ?
					props.hasBoughtVideo ?
						props.videoInCart ?
							<button
								className="btn text-light mb-1 rounded-0"
								style={{
									minWidth: '40px',
									height: '33px',
									backgroundColor: "#232323"
								}}
								onClick={() => props.onCartVideos(props.videoId)}>
								<CartSVG />
							</button> :
							<>
								<button
									className="mysonar-btn white-btn mb-1"
									style={{ minWidth: '40px', height: '33px' }}
									onClick={() => props.onCartVideos(props.videoId)}>
									<CartSVG />
								</button>
								<Button
									btnClass={'btn mysonar-btn green-btn btn-2 float-right'}
									btnText={'KES 20'}
									onClick={() => props.onBuyVideos(props.videoId)} />
							</> : ""
					: ""}
			</div>
		</div>
	)
}

VideoMediaHorizontal.defaultProps = {
	link: '/',
	thumbnail: '/',
	name: 'name',
	username: 'username',
	ft: 'ft',
	hasBoughtVideo: true,
	videoInCart: true,
	videoId: 1,
	showCartandBuyButton: true,
}

export default VideoMediaHorizontal
