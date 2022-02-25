import React from 'react'

const LoadingVideoMediaHorizontal = () => {
	return (
		<div className="d-flex p-2 border-bottom">
			<div className="thumbnail gradient">
				<div className="w-25 h-25"></div>
			</div>
			<div className="ml-2 mr-auto flex-grow-1">
				<h6 className="mb-0 gradient"
					style={{
						width: "8em",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "clip",
						color: "#232323"
					}}>
					props.name
				</h6>
				<h6 className="mb-3 gradient"
					style={{
						width: "8em",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "clip"
					}}>
					<small style={{ color: "#232323" }}>props.username</small>
					<small className="ml-1" style={{ color: "#232323" }}>props.ft</small>
				</h6>
				<button
					className="btn mb-1 rounded-0"
					style={{ minWidth: '40px', height: '33px', backgroundColor: "#232323" }}>
				</button>
				<button
					className="btn mb-1 rounded-0 float-right"
					style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
				</button>
			</div>
		</div>
	)
}

export default LoadingVideoMediaHorizontal