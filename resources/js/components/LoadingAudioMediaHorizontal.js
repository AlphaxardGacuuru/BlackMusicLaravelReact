import React from 'react'

const LoadingAudioMediaHorizontal = () => {
	return (
		<div className="d-flex p-2">
			<div
				className="thumbnail gradient"
				style={{
					width: "50px",
					height: "50px"
				}}>
			</div>
			<div className="p-2 mr-auto">
				<span style={{ cursor: "pointer" }}>
					<h6
						className="mb-0 pb-0 gradient"
						style={{
							maxWidth: "6em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip",
							color: "#232323"
						}}>
						props.name
					</h6>
					<h6 className="mt-0 pt-0 gradient"
						style={{
							maxWidth: "6em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip"
						}}>
						<small style={{ color: "#232323" }}>props.username</small>
						<small className="ml-1" style={{ color: "#232323" }}>props.ft</small>
					</h6>
				</span>
			</div>
			<div>
				<button
					className="btn text-light rounded-0 mr-1"
					style={{ minWidth: '40px', height: '33px', backgroundColor: "#232323" }}>
				</button>
				<button
					className="btn text-light rounded-0"
					style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
				</button>
			</div>
		</div>
	)
}

export default LoadingAudioMediaHorizontal