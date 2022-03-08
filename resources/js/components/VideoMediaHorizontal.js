import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'

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
			<div className="ml-2 mr-auto flex-grow-1" onClick={() => props.setShow(0)}>
				<Link to={props.link}>
					<h6 className="mb-0"
						style={{
							width: "9em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						{props.name}
					</h6>
					<h6 className="mb-3"
						style={{
							width: "9em",
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
								style={{ minWidth: '40px', height: '33px', backgroundColor: "#232323" }}
								onClick={() => props.onCartVideos(props.videoId)}>
								<svg
									className='bi bi-cart3'
									width='1em'
									height='1em'
									viewBox='0 0 16 16'
									fill='currentColor'
									xmlns='http://www.w3.org/2000/svg'>
									<path fillRule='evenodd'
										d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
								</svg>
							</button> :
							<>
								<button
									className="mysonar-btn white-btn mb-1"
									style={{ minWidth: '40px', height: '33px' }}
									onClick={() => props.onCartVideos(props.videoId)}>
									<svg
										className='bi bi-cart3'
										width='1em'
										height='1em'
										viewBox='0 0 16 16'
										fill='currentColor'
										xmlns='http://www.w3.org/2000/svg'>
										<path fillRule='evenodd'
											d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
									</svg>
								</button>
								<Button
									btnClass={'btn mysonar-btn green-btn btn-2 float-right'}
									btnText={'buy'}
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
