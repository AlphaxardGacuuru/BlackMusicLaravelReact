import React from 'react'
import { Link } from 'react-router-dom'

const KaraokeMedia = (props) => {
	return (
		<div
			className="m-1"
			style={{
				borderRadius: "0px",
				textAlign: "center",
				width: "47%"
			}}
			onClick={() => props.setShow(0)}>
			<div className="w-100">
				<Link to={props.link}>
					<video
						src={props.src}
						width="100%"
						preload="none"
						autoPlay
						muted
						loop
						playsInline>
					</video>
				</Link>
			</div>
			<h6 className="m-0 pt-2 px-1"
				style={{
					width: "150px",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "clip",
				}}>
				{props.name}
			</h6>
			<h6 className="mt-0 mx-1 mb-2 px-1 py-0">{props.username}</h6>
		</div>
	)
}

export default KaraokeMedia