import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'

const AudioMediaHorizontal = (props) => {
	return (
		<div className="d-flex p-2">
			<div
				className="thumbnail"
				style={{
					width: "50px",
					height: "50px"
				}}>
				<Link
					to={props.link}
					onClick={() => {
						props.setShow(props.audioId)
						props.setLocalStorage("show", {
							"id": props.audioId,
							"time": 0
						})
					}}>
					<Img
						src={props.thumbnail}
						width="100%"
						height="50px" />
				</Link>
			</div>
			<div className="p-2 mr-auto">
				<span
					style={{ cursor: "pointer" }}
					onClick={() => {
						props.setShow(props.audioId)
						props.setLocalStorage("show", {
							"id": props.audioId,
							"time": 0
						})
					}}>
					<h6
						className="mb-0 pb-0"
						style={{
							maxWidth: "6em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						{props.name}
					</h6>
					<h6 className="mt-0 pt-0"
						style={{
							maxWidth: "9em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						<small>{props.username}</small>
						<small className="ml-1">{props.ft}</small>
					</h6>
				</span>
			</div>
			{props.showCartandBuyButton ?
				props.hasBoughtAudio ?
					props.audioInCart ?
						<div>
							<button
								className="btn text-light rounded-0"
								style={{ minWidth: '40px', height: '33px', backgroundColor: "#232323" }}
								onClick={() => props.onCartAudios(props.audioId)}>
								<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
									fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
									<path fillRule='evenodd'
										d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
								</svg>
							</button>
						</div> :
						<>
							<div>
								<button
									className="mysonar-btn white-btn"
									style={{ minWidth: '40px', height: '33px' }}
									onClick={() => props.onCartAudios(props.audioId)}>
									<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
										fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
										<path fillRule='evenodd'
											d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
									</svg>
								</button>
							</div>
							<div className="ml-2">
								<Button
									btnClass={'btn mysonar-btn green-btn btn-2 float-right'}
									btnText={'KES 10'}
									onClick={() => props.onBuyAudios(props.audioId)} />
							</div>
						</> : ""
				: ""}
		</div>
	)
}

AudioMediaHorizontal.defaultProps = {
	link: '/',
	thumbnail: '/',
	name: 'name',
	username: 'username',
	ft: 'ft',
	hasBoughtAudio: true,
	audioInCart: true,
	audioId: 1,
	showCartandBuyButton: true
}

export default AudioMediaHorizontal
