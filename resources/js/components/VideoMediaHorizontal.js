import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'

const VideoMediaHorizontal = (props) => {
	return (
		<div className="media p-2 border-bottom">
			<div className="media-left thumbnail" onClick={() => props.setShow(0)}>
				<Link to={props.link}>
					<Img
						src={props.thumbnail}
						width="160em"
						height="90em" />
				</Link>
			</div>
			<div className="media-body ml-2">
				<Link to={props.link}>
					<h6
						className="m-0 pt-2 pr-1 pl-1"
						style={{
							width: "150px",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						{props.name}
					</h6>
					<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
						<small>
							{props.username}
						</small>
						<small className="ml-1">
							{props.ft}
						</small>
					</h6>
				</Link>
				{props.showCartandBuyButton ?
					props.hasBoughtVideo ?
						props.videoInCart ?
							<button
								className="btn btn-light mb-1 rounded-0"
								style={{ minWidth: '40px', height: '33px' }}
								onClick={() => props.onCartVideos(props.videoId)}>
								<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
									fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
									<path fillRule='evenodd'
										d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
								</svg>
							</button> :
							<>
								<button
									className="mysonar-btn mb-1"
									style={{ minWidth: '40px', height: '33px' }}
									onClick={() => props.onCartVideos(props.videoId)}>
									<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
										fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
										<path fillRule='evenodd'
											d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
									</svg>
								</button>
								<Button
									btnClass={'btn mysonar-btn green-btn float-right'}
									btnText={'buy'}
									onClick={() => props.onBuyVideos(props.videoId)} />
							</> : ""
					: ""}
			</div>
		</div >
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